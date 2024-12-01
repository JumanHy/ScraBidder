public class RegistrationResult
{
    public bool Success { get; set; }

 
    public string Message { get; set; }


    public List<string> ErrorCodes { get; set; }
    public static RegistrationResult DuplicateEntry { get; internal set; }

    public RegistrationResult()
    {
        ErrorCodes = new List<string>();
    }
}
