using System;
using System.ComponentModel.DataAnnotations;
using api.Dtos;

namespace api.Models
{
    public class Individual
    {
        [Key]
        public int IndividualId { get; set; }

        public string PhoneNumber { get; set; }

        public string? Image { get; set; }

        [Required]
        public string UserId { get; set; }

        public string? Address { get; set; } // JSON

        public ApplicationUser User { get; set; } // Relationship with ApplicationUser
        [Required]
        public string FirstName { get; internal set; }
        [Required]
        public string LastName { get; internal set; }


    }
}
