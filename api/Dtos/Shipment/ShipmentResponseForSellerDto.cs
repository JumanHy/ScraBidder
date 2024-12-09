using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;

namespace api.Dtos.Shipment
{
    public class ShipmentResponseForSellerDto
    {
        public int ShipmentId { get; set; }
        public DeliveryStatus DeliveryStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public ShipmentBuyerInfoDto Buyer { get; set; }
        public ShipmentAuctionDto Auction { get; set; }
    }
}