namespace Tools
{
    public class CommandLine
    {
        public static bool ValidFile(string path)
        {
            if(!Directory.Exists(Path.GetDirectoryName(path))) {
                Console.WriteLine($"Cannot access {path}.");
                return false;
            }

            if (!File.Exists(path)) {
                Console.WriteLine($"Unable to find {path}.");
                return false;
            }

            if(new FileInfo(path).Length <= 0) {
                Console.WriteLine($"{path} is emtpy.");
                return false;
            }
            
            return true;
        }
    }
}