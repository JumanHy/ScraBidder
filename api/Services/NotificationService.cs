using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Notification;
using api.Hubs;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class NotificationService
    {
        private readonly ApplicationDBContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;
        public NotificationService(ApplicationDBContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;

        }
        public async Task AddNotification(string userId, NotificationItem newNotification)
        {
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.UserId == userId);

            List<NotificationItem> notificationsList;

            if (notification == null)
            {
                // If no existing notifications, create a new list and add the new notification at the beginning
                notificationsList = new List<NotificationItem> { newNotification };
                notification = new Notification
                {
                    UserId = userId,
                    NotificationsInfo = JsonSerializer.Serialize(notificationsList)
                };

                _context.Notifications.Add(notification);
            }
            else
            {
                // Deserialize the existing notifications list
                notificationsList = JsonSerializer.Deserialize<List<NotificationItem>>(notification.NotificationsInfo);

                // Prepend the new notification to the list to make it the most recent
                notificationsList.Insert(0, newNotification);

                // Serialize and update the NotificationsInfo
                notification.NotificationsInfo = JsonSerializer.Serialize(notificationsList);
            }

            await _context.SaveChangesAsync();

            // Send the notification to the user via SignalR
            await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", newNotification);
        }

        public async Task<List<NotificationItem>> GetUserNotifications(string userId)
        {
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.UserId == userId);

            if (notification == null || string.IsNullOrEmpty(notification.NotificationsInfo))
                return new List<NotificationItem>();

            var notificationsList = JsonSerializer.Deserialize<List<NotificationItem>>(notification.NotificationsInfo);

            // Order notifications by createdAt in descending order (most recent first)
            return notificationsList;
        }

        public async Task MarkNotificationAsRead(string userId, int index)
        {
            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.UserId == userId);

            if (notification != null)
            {
                var notificationsList = JsonSerializer.Deserialize<List<NotificationItem>>(notification.NotificationsInfo);
                if (index >= 0 && index < notificationsList.Count)
                {
                    notificationsList[index].IsRead = true;
                    notification.NotificationsInfo = JsonSerializer.Serialize(notificationsList);
                    await _context.SaveChangesAsync();
                }
            }
        }

    }


}