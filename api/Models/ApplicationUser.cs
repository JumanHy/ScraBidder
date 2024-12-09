using api.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    // This class inherits from IdentityUser to integrate with ASP.NET Core Identity
    public class ApplicationUser : IdentityUser
    {
        // Add your custom fields here
        [Required]
        public AccountStatus Status { get; set; }  // Using the AccountStatus enum instead of string

       public string? ProfileImage { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; set; }
        public Business Business { get; set; }
        public Individual Individual { get; set; }


    }
}
