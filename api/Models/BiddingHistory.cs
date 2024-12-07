using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Models
{
    public class BiddingHistory
    {
        [Key]
        public int BidId { get; set; }

        [Required]
        public int AuctionId { get; set; }

        [Required]
        public int BidderId { get; set; }

        [Required]
        public decimal BidAmount { get; set; }

        [Required]
        public DateTime BidTime { get; set; }
        [JsonIgnore]
        public Auction Auction { get; set; }
        public User Bidder { get; set; }
    }

}