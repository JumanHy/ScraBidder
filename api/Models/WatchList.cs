using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class WatchList
    {
        [Key]
        public int WatchId { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty;

        [Required]
        public int AuctionId { get; set; }

        public ApplicationUser User { get; set; }
        public Auction Auction { get; set; }
    }


}
