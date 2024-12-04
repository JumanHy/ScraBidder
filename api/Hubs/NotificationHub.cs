using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Services;
using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly NotificationService _notificationService;
        public NotificationHub(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        public async Task MarkNotificationAsRead(int index)
        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // Call the service method to mark the notification as read
            await _notificationService.MarkNotificationAsRead(userId, index);

            // Notify all clients about the change (if needed)
            await Clients.User(userId).SendAsync("NotificationMarkedAsRead", index);
        }
        public override Task OnConnectedAsync()
        {
            var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Maps to JWT's Name or "sub" claim
            Console.WriteLine($"User connected: {userId}");
            return base.OnConnectedAsync();
        }
        public async Task SendNotification(string userId, string message)
        {
            Console.WriteLine($"User id is: {userId}");
            await Clients.User(userId).SendAsync("ReceiveNotification", message);
        }
    }
}