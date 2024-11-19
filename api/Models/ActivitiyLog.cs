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
        public int UserId { get; set; }

        [Required]
        public int ActionId { get; set; }

        [Required]
        public DateTime ActionTime { get; set; }

        public User User { get; set; }
        public Action Action { get; set; }
    }

}