using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class DashboardStatsDTO
{
    public int TotalUsers { get; set; }
    public int ActiveUsers { get; set; }
    public int PendingUsers { get; set; }
    public int BlockedUsers { get; set; }
}

}