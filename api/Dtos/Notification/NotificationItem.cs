using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Notification
{
    public class NotificationItem
    {

        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Type { get; set; }
        public bool IsRead { get; set; } = false;

    }
}