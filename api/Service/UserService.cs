using api.Data;
using api.Dtos;
using api.Enums;
using api.Events;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace api.Service
{
    public class UserService : IUserService
    {
        private readonly ApplicationDBContext _context;
        private readonly EventDispatcher _eventDispatcher;

        // Constructor to inject the ApplicationDBContext into the service
        public UserService(ApplicationDBContext context, EventDispatcher eventDispatcher)
        {
            _context = context;
            _eventDispatcher = eventDispatcher;
        }
        // Fetch dashboard statistics
        public async Task<DashboardStatsDTO> GetDashboardStatsAsync()
        {
            var totalUsers = await _context.Users.CountAsync();
            var activeUsers = await _context.Users.CountAsync(u => u.Status == AccountStatus.Active);
            var pendingUsers = await _context.Users.CountAsync(u => u.Status == AccountStatus.Pending);
            var blockedUsers = await _context.Users.CountAsync(u => u.Status == AccountStatus.Blocked);
            return new DashboardStatsDTO
            {
                TotalUsers = totalUsers,
                ActiveUsers = activeUsers,
                PendingUsers = pendingUsers,
                BlockedUsers = blockedUsers
            };
        }
        // Fetch all users as UserDTO
        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(user => new UserDto
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,

                    Status = user.Status.ToString()
                })
                .ToListAsync();
        }
        // Fetch a user by username or email as UserDTO
        public async Task<UserDto> GetUserByUsernameOrEmailAsync(string usernameOrEmail)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == usernameOrEmail || u.Email == usernameOrEmail);
            if (user == null)
                return null;
            return new UserDto
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,

                Status = user.Status.ToString()
            };
        }

        public async Task<SellerDashboardDTO> GetSellerDashboardDataAsync(string sellerId)
        {
            // Fetch auctions belonging to the seller
            var sellerAuctions = await _context.Auctions
                .Where(a => a.SellerId == sellerId)
                .Select(a => a.AuctionId)
                .ToListAsync();

            if (!sellerAuctions.Any())
                return new SellerDashboardDTO(); // Return default if no auctions exist

            // Fetch transactions for these auctions where TransactionType is Capture
            var transactions = await _context.TransactionHistory
                .Where(t => sellerAuctions.Contains(t.AuctionId) && t.TransactionType == TransactionType.Capture)
                .ToListAsync();

            // Calculate total revenue
            var totalRevenue = transactions.Sum(t => t.Amount);

            // Group transactions by month to calculate revenue over time
            var revenueOverTime = transactions
                .GroupBy(t => t.CreatedAt.ToString("yyyy-MM")) // Group by year and month
                .Select(g => new TimeSeriesData
                {
                    Period = g.Key,
                    TotalAmount = g.Sum(t => t.Amount)
                })
                .ToList();

            // Group transactions by month to calculate items sold over time
            var itemsSoldOverTime = transactions
    .Where(t => t.TransactionPurpose == TransactionPurpose.Purchase && t.TransactionType == TransactionType.Capture) // Filter by purpose and type
    .GroupBy(t => t.CreatedAt.ToString("yyyy-MM")) // Group by year and month
    .Select(g => new TimeSeriesData
    {
        Period = g.Key,
        TotalCount = g.Count() // Count the filtered transactions
    })
    .ToList();

            return new SellerDashboardDTO
            {
                TotalRevenue = totalRevenue,
                RevenueOverTime = revenueOverTime,
                ItemsSoldOverTime = itemsSoldOverTime
            };
        }

        // Update all users and handle logic for user type and status update
        public async Task<bool> UpdateAllUsersAsync(List<UserUpdateDto> userUpdateDtos)
        {
            if (userUpdateDtos == null || userUpdateDtos.Count == 0)
                return false;

            // Fetch users to be updated from the database by matching their IDs
            var userIds = userUpdateDtos.Select(dto => dto.UserId).ToList();
            var users = await _context.Users.Where(u => userIds.Contains(u.Id)).ToListAsync();

            if (users == null || users.Count == 0)
                return false;

            // Create a dictionary for easy lookup
            var userUpdateMap = userUpdateDtos.ToDictionary(dto => dto.UserId);
            var updatedUsers = new List<ApplicationUser>();
            // Loop through each user to update their properties
            foreach (var user in users)
            {
                try
                {
                    if (userUpdateMap.TryGetValue(user.Id, out var updateDto))
                    {



                        if (!string.IsNullOrEmpty(updateDto.Status))
                        {
                            user.Status = Enum.Parse<AccountStatus>(updateDto.Status);
                            updatedUsers.Add(user);
                        }
                        // Add additional updates as needed
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception and continue with the next user
                    Console.WriteLine($"Error updating user {user.Id}: {ex.Message}");
                    throw new Exception("Error updating users");
                }
            }

            // Save changes to the database
            await _context.SaveChangesAsync();
            foreach (var user in updatedUsers)
            {
                var userStatus = new UserStatusUpdatedEvent(user.Id, user.Status.ToString());

                await _eventDispatcher.Dispatch(userStatus);
            }
            return true;
        }
    }
}





