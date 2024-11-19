using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Business
    {

        [Key]
        public int BusinessId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required, MaxLength(100)]
        public string BusinessName { get; set; }

        public string BusinessServices { get; set; }

        [Required]
        public string BusinessType { get; set; } // Enum: seller, buyer, both

        [Required, EmailAddress]
        public string BusinessEmail { get; set; }

        [Required, MaxLength(20)]
        public string BusinessPhoneNumber { get; set; }

        public string Images { get; set; } // JSON

        public string CompanyVision { get; set; }

        [MaxLength(200)]
        public string LinkedIn { get; set; }

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

        public User User { get; set; }


    }
}