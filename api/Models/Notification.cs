using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Notification
    {
        [Key]
        public int NotificationsId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string NotificationsInfo { get; set; } // JSON

        public ApplicationUser User { get; set; }
    }

}