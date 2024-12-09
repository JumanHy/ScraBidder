using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Shipment;
using api.Enums;
using api.Models;

namespace api.Interfaces
{
    public interface IShipmentService
    {
        Task<IEnumerable<ShipmentResponseForSellerDto>> GetShipmentsForSellerAsync(string sellerId);
        Task<IEnumerable<ShipmentResponseForBuyerDto>> GetShipmentsForBuyerAsync(string buyerId);
        Task CreateShipmentAsync(Shipment shipment);
        Task UpdateDeliveryStatusAsync(int shipmentId, DeliveryStatus newStatus, string sellerId);
    }
}