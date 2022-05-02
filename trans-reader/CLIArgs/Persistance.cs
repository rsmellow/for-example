using System.Data;
using Accounting;
using MySqlConnector;
using Renci.SshNet;

namespace Tools
{
    public static class Persistance
    {

        private static void SshTunnel(Action cnOp)
        {
            try
            {
                var sshCl = new SshClient("server", "user", new PrivateKeyFile("path"));
                sshCl.Connect();
                if (sshCl.IsConnected)
                {
                    var fp = new ForwardedPortLocal("127.0.0.1", 3306, "127.0.0.1", 3306);
                    sshCl.AddForwardedPort(fp);
                    fp.Start();
                    cnOp();
                    sshCl.Disconnect();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private static void RunCommand(Action<MySqlConnection> cmdOp)
        {
            try
            {
                Console.WriteLine("Connecting to MySQL...");
                SshTunnel(() =>
                {
                    using var cn = new MySqlConnection($"server=127.0.0.1;port=3306;user=user;database=Banking;password=password");
                    cmdOp(cn);
                        
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public static void UpsertTransactions(IEnumerable<ITransaction> transactions)
        {
            var dSet = new DataSet();
            var adapter = new MySqlDataAdapter();
            
            var selectCmd = new MySqlCommand("select date, amount, description, account_id from Banking.transactions");
            
            var insertCmd = new MySqlCommand("insert into Banking.transactions (date, amount, description, account_id) values (@date, @amount, @description, @account)");
            insertCmd.Parameters.Add(new MySqlParameter("@date", MySqlDbType.Date,4,"date"));
            insertCmd.Parameters.Add(new MySqlParameter("@amount", MySqlDbType.Decimal,4,"amount"));
            insertCmd.Parameters.Add(new MySqlParameter("@description", MySqlDbType.VarChar, 255,"description"));
            insertCmd.Parameters.Add(new MySqlParameter("@account", MySqlDbType.Int16, 4, "account_id"));

            RunCommand(cn =>
            {
                selectCmd.Connection = cn;
                adapter.SelectCommand = selectCmd;
                // Fill Dataset with query command
                adapter.Fill(dSet);
            });

            foreach (var t in transactions)
            {
                var dTable = dSet.Tables[0];
                var dr = dTable.NewRow();
                dr["date"] = t.Date;
                dr["amount"] = t.Amount;
                dr["description"] = t.Description;
                dr["account_id"] = 0;
                dTable.Rows.Add(dr);
            }

            RunCommand(cn =>
            {
                 insertCmd.Connection = cn;
                insertCmd.UpdatedRowSource = UpdateRowSource.None;
                adapter.InsertCommand = insertCmd;
                adapter.UpdateBatchSize = 64;
                adapter.Update(dSet.Tables[0]);
            });
        }

        public static void AddPayPalTransactions(IEnumerable<ITransaction> transactions)
        {
            var parameters = new MySqlParameter[4];
            parameters[0] = new MySqlParameter("in_date", MySqlDbType.DateTime);
            parameters[1] = new MySqlParameter("in_payee", MySqlDbType.VarChar);
            parameters[2] = new MySqlParameter("in_desc", MySqlDbType.VarChar);
            parameters[3] = new MySqlParameter("in_amount", MySqlDbType.Decimal);

            var paypalCmd = new MySqlCommand("add_paypal")
            {
                CommandType = CommandType.StoredProcedure
            };

            RunCommand(cn =>
            {
                paypalCmd.Connection = cn;
                cn.Open();
                transactions.ToList().ForEach(t =>
                {
                    paypalCmd.Parameters.Clear();
                    parameters[0].Value = t.Date;
                    parameters[1].Value = t.Payee;
                    parameters[2].Value = t.Description;
                    parameters[3].Value = t.Amount;
                    paypalCmd.Parameters.AddRange(parameters);
                    paypalCmd.ExecuteNonQuery();
                });
                cn.Close();
            });
        }


    }

}