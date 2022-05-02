using Tools;
using Accounting;

if (CommandLine.ValidFile(args[0]))
{
    Console.WriteLine($"Processing {args[0]} for {args[1]}.");
    IEnumerable<ITransaction> transactions = new List<ITransaction>();
    switch (args[1].ToUpper())
    {
        case "COASTAL":
            transactions = TransactionParser.ParseCoastalCSV(args[0]);
            Persistance.UpsertTransactions(transactions);
            break;
        case "PAYPAL":
            transactions = TransactionParser.ParsePayPalCSV(args[0]);
            Persistance.AddPayPalTransactions(transactions);
            break;
        case "FARGO":
            transactions = TransactionParser.ParseWellsFargoCSV(args[0]);
            break;
        default:
            Console.WriteLine($"Please specify the origin for {args[0]}: coastal, paypal or fargo.");
            break;
    }

    if (transactions.Any())
    {
        Console.WriteLine("--------------------------------------------------------------------");
        //transactions.ToList().ForEach(Console.WriteLine);
    }

}

