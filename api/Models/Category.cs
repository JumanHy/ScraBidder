using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Category
    {

        [Key]
        public int CategoryId { get; set; }

        [Required, MaxLength(50)]
        public string CategoryName { get; set; }

        public List<Auction> Auctions { get; set; } = new List<Auction>();

    }
}