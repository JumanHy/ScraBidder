using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Shipment
    {
        [Key]
        public int ShipmentId { get; set; }

        [Required]
        public int AuctionId { get; set; }

        [Required]
        public int SellerId { get; set; } // Seller responsible for shipping

        [Required]
        public DeliveryStatus DeliveryStatus { get; set; } // Enum: pending, shipped, in-transit, delivered, canceled

        [Required]
        public DateTime CreatedAt { get; set; }
        public User Seller { get; set; }

        public Auction Auction { get; set; }
    }

}