using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class User
    {

        [Key]
        public int UserId { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string AccountStatus { get; set; } // Enum: pending, approved, denied, blocked

        [Required]
        public DateTime CreatedAt { get; set; }

        public Role Role { get; set; }


    }
}