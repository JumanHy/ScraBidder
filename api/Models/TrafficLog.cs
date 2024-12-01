using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TrafficLog
    {
        [Key]
        public int LogId { get; set; }

        [Required, MaxLength(50)]
        public string VisitorIp { get; set; }

        public int? UserId { get; set; }

        public DateTime VisitTime { get; set; }

        public ApplicationUser User { get; set; }
    }

}