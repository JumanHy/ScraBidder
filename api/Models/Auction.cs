using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
        public string AuctionStatus { get; set; } // Enum: pending, approved, denied, started, ended

        [Required]
        public decimal StartingBid { get; set; }

        public decimal? CurrentBid { get; set; }

        public decimal? ReservePrice { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime StartingTime { get; set; }

        [Required]
        public DateTime EndingTime { get; set; }

        public string Address { get; set; } // JSON

        [Required]
        public string Condition { get; set; } // Enum: new, used, mixed

        [Required]
        public decimal Quantity { get; set; }

        public ApplicationUser Seller { get; set; }
        public Category Category { get; set; }

        public List<BiddingHistory> Biddings { get; set; } = new List<BiddingHistory>();
    }

}