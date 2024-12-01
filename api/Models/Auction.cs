using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Auction
    {
        [Key]
        public int AuctionId { get; set; }

        [Required]
        public string SellerId { get; set; }

        [Required, MaxLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public string Images { get; set; } // JSON

        [Required]
        public AuctionStatus AuctionStatus { get; set; } // Enum: pending, approved, denied, started, ended

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal StartingBid { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? CurrentBid { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ReservePrice { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime StartingTime { get; set; }

        [Required]
        public DateTime EndingTime { get; set; }

        public string Address { get; set; } // JSON

        [Required]
        public Condition Condition { get; set; } // Enum: new, used, mixed

        [Required]
        public decimal Quantity { get; set; }

        public ApplicationUser Seller { get; set; }
        public Category Category { get; set; }

        public List<BiddingHistory> Biddings { get; set; } = new List<BiddingHistory>();
        public List<Shipment> Shipments { get; set; } = new List<Shipment>();
        public List<TransactionHistory> Transactions { get; set; } = new List<TransactionHistory>();
    }

}