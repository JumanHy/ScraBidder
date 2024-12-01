using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    // Enum to represent the Account Status
    public enum AccountStatus
    {
        Pending,
        Active,
        Blocked
    }


    public enum UserType
    {
        Admin,
        Individual,
        Business
    }


    // This class inherits from IdentityUser to integrate with ASP.NET Core Identity
    public class ApplicationUser : IdentityUser
    {
        // Add your custom fields here
        [Required]
        public AccountStatus Status { get; set; }  // Using the AccountStatus enum instead of string

        [Required]
        public DateTime CreatedAt { get; set; }

        // Optional: Relationships with Business and Individual
        [Required]
        public UserType UserType { get; set; }
        public Business Business { get; set; }
        public Individual Individual { get; set; }




        // Add navigation properties if you want to easily query the related entities
        // To manage roles associated with the user


    }
}
