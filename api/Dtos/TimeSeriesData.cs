using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class TimeSeriesData
    {
        public string Period { get; set; } // Format: "yyyy-MM" for grouping by month
        public decimal TotalAmount { get; set; } // For revenue
        public int TotalCount { get; set; } // For items sold
    }
}