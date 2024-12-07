using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class IndividualRegisterDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "First name must not exceed 50 characters.")]
        public string? FirstName { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Last name must not exceed 50 characters.")]
        public string ?LastName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string ?Email { get; set; }

        [Required]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string ?PhoneNumber { get; set; }
        

        // Removed custom password validation constraints
        [Required]
        public string ?Password { get; set; }

        [Required]
        public string ?ConfirmPassword { get; set; }

        
    }
}
