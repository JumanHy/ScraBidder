using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Action
    {
        [Key]
        public int ActionId { get; set; }

        [Required, MaxLength(50)]
        public string ActionName { get; set; } = string.Empty;

        public List<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
    }

}