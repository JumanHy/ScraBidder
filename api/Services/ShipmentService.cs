using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Shipment;
using api.Enums;
using api.Events;
using api.Interfaces;
using api.Models;
using api.Repositories.Interface;

namespace api.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IShipmentRepository _repository;
        private readonly EventDispatcher _eventDispatcher;

        public ShipmentService(IShipmentRepository repository, EventDispatcher eventDispatcher)
        {
            _repository = repository;
            _eventDispatcher = eventDispatcher;
        }

        public async Task<IEnumerable<ShipmentResponseForSellerDto>> GetShipmentsForSellerAsync(string sellerId)
        {
            var shipments = await _repository.GetShipmentsForUserAsync(sellerId);

            return shipments.Where(s => s.SellerId == sellerId)
                .Select(s => new ShipmentResponseForSellerDto
                {
                    ShipmentId = s.ShipmentId,
                    DeliveryStatus = s.DeliveryStatus,
                    CreatedAt = s.CreatedAt,
                    Buyer = new ShipmentBuyerInfoDto
                    {
                        BuyerId = s.BuyerId,
                        BuyerName = s.Buyer.Business?.BusinessName ?? s.Buyer.Individual?.FirstName + " " + s.Buyer.Individual?.LastName,
                    },
                    Auction = new ShipmentAuctionDto
                    {
                        AuctionId = s.AuctionId,
                        Title = s.Auction.Title
                    }
                });
        }

        public async Task<IEnumerable<ShipmentResponseForBuyerDto>> GetShipmentsForBuyerAsync(string buyerId)
        {
            var shipments = await _repository.GetShipmentsForUserAsync(buyerId);

            return shipments.Where(s => s.BuyerId == buyerId)
                .Select(s => new ShipmentResponseForBuyerDto
                {
                    ShipmentId = s.ShipmentId,
                    DeliveryStatus = s.DeliveryStatus,
                    CreatedAt = s.CreatedAt,
                    Seller = new ShipmentSellerInfoDto
                    {
                        SellerId = s.SellerId,
                        SellerName = s.Seller.Business.BusinessName
                    },
                    Auction = new ShipmentAuctionDto
                    {
                        AuctionId = s.AuctionId,
                        Title = s.Auction.Title
                    }
                });
        }

        public async Task CreateShipmentAsync(Shipment shipment)
        {
            shipment.CreatedAt = DateTime.UtcNow;
            shipment.DeliveryStatus = DeliveryStatus.Pending;
            await _repository.AddShipmentAsync(shipment);

            var shipmentEvent = new ShipmentEvent(shipment.BuyerId, shipment.AuctionId, shipment.DeliveryStatus);

            // Dispatch the event to handlers
            await _eventDispatcher.Dispatch(shipmentEvent);
        }

        public async Task UpdateDeliveryStatusAsync(int shipmentId, DeliveryStatus newStatus, string sellerId)
        {
            var shipment = await _repository.GetShipmentByIdAsync(shipmentId);
            if (shipment == null || shipment.SellerId != sellerId)
            {
                throw new KeyNotFoundException("Shipment not found.");
            }

            var newShipmentRecord = new Shipment
            {
                AuctionId = shipment.AuctionId,
                SellerId = shipment.SellerId,
                BuyerId = shipment.BuyerId,
                DeliveryStatus = newStatus,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddShipmentAsync(newShipmentRecord);
            var shipmentEvent = new ShipmentEvent(shipment.BuyerId, shipment.AuctionId, newShipmentRecord.DeliveryStatus);

            // Dispatch the event to handlers
            await _eventDispatcher.Dispatch(shipmentEvent);
        }

    }
}