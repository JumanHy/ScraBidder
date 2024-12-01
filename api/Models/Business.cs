using System;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Business
    {
        [Key]
        public int BusinessId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required, MaxLength(100)]
        public string BusinessName { get; set; }

        public string? BusinessServices { get; set; } = string.Empty;

        [Required]
        public string BusinessType { get; set; } // Enum: seller, buyer, both

        [Required, EmailAddress]
        public string BusinessEmail { get; set; }

        [Required, MaxLength(20)]
        public string BusinessPhoneNumber { get; set; }

        public string? Images { get; set; } = string.Empty; // JSON

        public string? CompanyVision { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? LinkedIn { get; set; } = string.Empty;

        [Required]
        public string RegistrationNumber { get; set; }

        public string Address { get; set; } // JSON

        [Required, MaxLength(20)]
        public string PrimaryPhoneNumber { get; set; }

        [Required, MaxLength(100)]
        public string PrimaryContactFirstName { get; set; }

        [Required, MaxLength(100)]
        public string PrimaryContactLastName { get; set; }

        [Required, MaxLength(50)]
        public string PrimaryJobTitle { get; set; }

        [Required, EmailAddress, MaxLength(100)]
        public string PrimaryContactEmail { get; set; }

        public ApplicationUser User { get; set; }
    }
}
