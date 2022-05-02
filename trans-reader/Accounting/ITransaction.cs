namespace Accounting
{
    public interface ITransaction
    {
        Guid Id { get; }
        string Description { get;}
        string Payee { get; }
        DateTime Date { get; }
        decimal Amount { get;  }

        bool IsDebit { get; }
        bool IsCredit { get; }
    }


    public class Transaction : ITransaction
    {
        public Guid Id { get; private set; }
        public string Description { get; private set; }
        public string Payee { get; private set; }
        public DateTime Date { get; private set; }
        public decimal Amount { get; private set; }

        public bool IsDebit { get { return Amount < 0; } }
        public bool IsCredit { get { return Amount >= 0; } }

        public Transaction(string desc, DateTime date, decimal amount, string payee = "")
        {
            Description = desc;
            Payee = payee;
            Date = date;
            Amount = amount;
            Id = Guid.NewGuid();
        }

        public override string ToString()
        {
            return $"{Date.ToShortDateString()} {Payee,-20} {Description,-40} {Amount,15:C2}";
        }
    }
}