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
        public string SellerId { get; set; } // Seller responsible for shipping

        [Required]
        public string BuyerId { get; set; }

        [Required]
        public DeliveryStatus DeliveryStatus { get; set; } // Enum: pending, shipped, in-transit, delivered, canceled

        [Required]
        public DateTime CreatedAt { get; set; }
        public ApplicationUser Seller { get; set; }
        public ApplicationUser Buyer { get; set; }

        public Auction Auction { get; set; }
    }

}