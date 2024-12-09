using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Notification;
using api.Enums;
using api.Events;
using api.Interfaces;

namespace api.Services
{
    public class NotificationHandler : IEventHandler<AuctionStatusChangedEvent>,
    IEventHandler<TransactionEvent>,
    IEventHandler<ShipmentEvent>,
    IEventHandler<UserStatusUpdatedEvent>,
    IEventHandler<NewBiddingEvent>,
    IEventHandler<AuctionEndedEvent>,
    IEventHandler<AuctionStartedEvent>

    {
        private readonly NotificationService _notificationService;

        public NotificationHandler(NotificationService notificationService)
        {
            _notificationService = notificationService;
        }
        public async Task Handle(AuctionStatusChangedEvent e)
        {

            string message = $"Your auction ({e.AuctionTitle}) has been {e.NewStatus} by the admin.";

            var notificationItem = new NotificationItem
            {
                Type = "AuctionStatusUpdated",
                Message = message,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            await _notificationService.AddNotification(e.SellerId, notificationItem);
        }
        public async Task Handle(TransactionEvent e)
        {

            string message = $"Your {e.Purpose} {e.Type} for Auction ID ({e.AuctionId}) has been created.";

            var notificationItem = new NotificationItem
            {
                Type = "TransactionUpdate",
                Message = message,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            await _notificationService.AddNotification(e.UserId, notificationItem);
        }
        public async Task Handle(ShipmentEvent e)
        {
            string message;

            if (e.DeliveryStatus == DeliveryStatus.Pending)
            {
                message = $"Your shipment for Auction ID ({e.AuctionId}) is pending, Contact the seller for shipping process";
            }
            else
            {
                message = $"Your shipment for Auction ID ({e.AuctionId}) is {e.DeliveryStatus}";

            }
            var notificationItem = new NotificationItem
            {
                Type = "ShipmentUpdate",
                Message = message,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            await _notificationService.AddNotification(e.BuyerId, notificationItem);
        }

        public async Task Handle(UserStatusUpdatedEvent e)
        {
            string message = $"Your Account is {e.NewStatus}";


            var notificationItem = new NotificationItem
            {
                Type = "UserStatusUpdate",
                Message = message,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            await _notificationService.AddNotification(e.UserId, notificationItem);
        }

        public async Task Handle(NewBiddingEvent e)
        {
            string sellerMessage = $"New Bid of {e.BidAmount} has been placed in your auction {e.AuctionTitle}";
            string watcherMessage = $"New Bid of {e.BidAmount} has been placed in your watched auction {e.AuctionTitle}";

            var notificationItemForSeller = new NotificationItem
            {
                Type = "NewBidding",
                Message = sellerMessage,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };
            var notificationItemForWatcher = new NotificationItem
            {
                Type = "NewBidding",
                Message = watcherMessage,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            await _notificationService.AddNotification(e.SellerId, notificationItemForSeller);

            foreach (var watcher in e.Watchers)
            {
                await _notificationService.AddNotification(watcher, notificationItemForWatcher);

            }
        }
        public async Task Handle(AuctionStartedEvent e)
        {
            // Personalized message for the seller
            string sellerMessage = $"Your auction \"{e.AuctionTitle}\" has started!";
            var sellerNotification = new NotificationItem
            {
                Type = "AuctionStarted",
                Message = sellerMessage,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };
            await _notificationService.AddNotification(e.SellerId, sellerNotification);

            // Notification for watchers
            string watcherMessage = $"The auction \"{e.AuctionTitle}\" you are watching has started!";
            var watcherNotification = new NotificationItem
            {
                Type = "AuctionStarted",
                Message = watcherMessage,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };

            foreach (var watcher in e.Watchers)
            {
                await _notificationService.AddNotification(watcher, watcherNotification);
            }
        }

        public async Task Handle(AuctionEndedEvent e)
        {
            // Personalized message for the seller
            string sellerMessage;
            if (e.WinnerId != null)
            {
                sellerMessage = $"Your auction \"{e.AuctionTitle}\" has ended with a Winner.";
            }
            else
            {
                sellerMessage = $"Your auction \"{e.AuctionTitle}\" has ended with no winner.";
            }
            var sellerNotification = new NotificationItem
            {
                Type = "AuctionEnded",
                Message = sellerMessage,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };
            await _notificationService.AddNotification(e.SellerId, sellerNotification);

            // Notification for watchers
            string watcherMessage = $"The auction \"{e.AuctionTitle}\" you were watching has ended.";
            var watcherNotification = new NotificationItem
            {
                Type = "AuctionEnded",
                Message = watcherMessage,
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };
            foreach (var watcher in e.Watchers)
            {
                await _notificationService.AddNotification(watcher, watcherNotification);
            }

            // Notification for the winner
            if (e.WinnerId != null)
            {
                string winnerMessage = $"Congratulations! You have won the auction \"{e.AuctionTitle}\". Go to the auction page to purchase";
                var winnerNotification = new NotificationItem
                {
                    Type = "AuctionEnded",
                    Message = winnerMessage,
                    CreatedAt = DateTime.UtcNow,
                    IsRead = false
                };
                await _notificationService.AddNotification(e.WinnerId, winnerNotification);
            }
        }

    }
}