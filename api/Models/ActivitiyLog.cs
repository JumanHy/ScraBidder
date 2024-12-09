using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ActivityLog
    {
        [Key]
        public int LogId { get; set; }

        [Required]
        public string? UserId { get; set; }

        [Required, MaxLength(50)]
        public string IpAddress { get; set; } = string.Empty;

        [Required]
        public int ActionId { get; set; }

        [Required]
        public DateTime ActionTime { get; set; }

        public ApplicationUser User { get; set; }
        public Action Action { get; set; }
    }

}