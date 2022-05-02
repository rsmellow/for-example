using Accounting;

using System.Globalization;
using System.Text.RegularExpressions;

namespace Tools
{
    public static class TransactionParser
    {
        public static IEnumerable<ITransaction> ParseCoastalCSV(string path)
        {
            StreamReader sr = new(path);
            var line = sr.ReadLine(); // Header
            if (line == null)
            {
                throw new ArgumentException($"{path} contains no data. Supplied file must be in the expected format.");
            }

            List<ITransaction> transactions = new();
            line = sr.ReadLine(); // First transaction line
            while (line != null)
            {
                var vals = line.Split("\",\"");
                var amount = vals[4].Replace("\"", "");
                var date = vals[0].Replace("\"", "");
                var desc = vals[1].Replace("\"", "");

                var tmp = new Transaction(desc, DateTime.Parse(date), FixAmount(amount));
                Console.WriteLine(tmp.Date);
                transactions.Add(tmp);
                line = sr.ReadLine();
            }

            return transactions;
        }

        public static IEnumerable<ITransaction> ParsePayPalCSV(string path) {
            StreamReader sr = new(path);
            var line = sr.ReadLine(); // Header
            if (line == null)
            {
                throw new ArgumentException($"{path} contains no data. Supplied file must be in the expected format.");
            }

            List<ITransaction> transactions = new();
            line = sr.ReadLine(); // First transaction line
            while (line != null)
            {
                var vals = line.Split("\",\"");
                var amount = vals[7].Replace("\"", "");
                var date = $"{vals[0].Replace("\"", "")} {vals[1].Replace("\"","")}";
                var desc = vals[4].Replace("\"", "");
                var payee = vals[3].Replace("\"", "");
                var status = vals[5].Replace("\"", "");
               
                // only look at completed status with actual amounts
                // discard "General Authorization" transactions when there is a corresponding "PreApproved Payment Bill" transaction
                if(status.ToUpper() == "COMPLETED" && !string.IsNullOrEmpty(amount))
                {
                    var tmp = new Transaction(desc, DateTime.ParseExact(date, "MM/dd/yyyy HH:mm:ss", new CultureInfo("en-US")), FixAmount(amount), payee);

                    bool duplicate = false;
                    if(desc.Contains("General Authorization"))
                    {
                        duplicate = transactions.Any(t =>
                        {
                            return
                            t.Amount == tmp.Amount &&
                            t.Date == tmp.Date &&
                            t.Payee == tmp.Payee;
                       });
                    }
                    
                    if(!duplicate)  transactions.Add(tmp);
                }
                line = sr.ReadLine();
            }

            return transactions;
        }

        public static IEnumerable<ITransaction> ParseWellsFargoCSV(string path)
        {
            throw new NotImplementedException();
        }


        private static decimal FixAmount(string input)
        {
            NumberStyles format = NumberStyles.AllowLeadingSign |
                                  NumberStyles.AllowDecimalPoint |
                                  NumberStyles.AllowCurrencySymbol |
                                  NumberStyles.AllowThousands;

            return decimal.Parse(input, format);
        }



    }


}
