using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Individual
    {
        [Key]
        public int IndividualId { get; set; }

        public string PhoneNumber { get; set; }

        public string Image { get; set; }

        [Required]
        public int UserId { get; set; }

        public string Address { get; set; } // JSON

        public User User { get; set; }
    }

}