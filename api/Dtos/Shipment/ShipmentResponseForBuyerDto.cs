using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Shipment
{
    public class ShipmentResponseForBuyerDto
    {
        public int ShipmentId { get; set; }
        public DeliveryStatus DeliveryStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public ShipmentSellerInfoDto Seller { get; set; }
        public ShipmentAuctionDto Auction { get; set; }
    }
}