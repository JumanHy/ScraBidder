using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class BusinessRegisterDto
    {
        // Company Information
        [Required]
        [MaxLength(100, ErrorMessage = "Company Name must not exceed 100 characters.")]
        public string? BusinessName { get; set; }

        // Business Type (Enum)
        [Required]
        [EnumDataType(typeof(BusinessType), ErrorMessage = "Business Type must be either Buyer, Seller, or Both.")]
        public string ?BusinessType { get; set; }

        [Required]
        [MaxLength(200, ErrorMessage = "Address must not exceed 200 characters.")]
        public string? Address { get; set; }

        [Required]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string ?BusinessNumber { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid company email format.")]
        public string ?BusinessEmail { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Company Registration Number must not exceed 50 characters.")]
        public string? RegistrationNumber { get; set; }

        [MaxLength(500, ErrorMessage = "Company Vision must not exceed 500 characters.")]
        public string ?CompanyVision { get; set; }

        // Primary Contact Information
        [Required]
        [MaxLength(50, ErrorMessage = "First Name must not exceed 50 characters.")]
        public string ?PrimaryContactFirstName { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Last Name must not exceed 50 characters.")]
        public string ?PrimaryContactLastName { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Job Title must not exceed 100 characters.")]
        public string ?PrimaryJobTitle { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid contact email format.")]
        public string ?PrimaryContactEmail { get; set; }

        [Required]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string ?PrimaryPhoneNumber { get; set; }

        [Url(ErrorMessage = "Invalid LinkedIn profile URL.")]
        public string LinkedIn { get; set; }

        // Create Your Account
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string ?Email { get; set; }

        // Removed custom password validation constraints
        [Required]
        public string ?Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }
    }
}
