using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class SellerDashboardDTO
    {
        public decimal TotalRevenue { get; set; }
        public List<TimeSeriesData> RevenueOverTime { get; set; } = new List<TimeSeriesData>();
        public List<TimeSeriesData> ItemsSoldOverTime { get; set; } = new List<TimeSeriesData>();

    }
}