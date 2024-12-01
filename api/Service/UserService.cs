using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Service
{
    public class UserService : IUserService
    {
        private readonly ApplicationDBContext _context;

        // Constructor to inject the ApplicationDBContext into the service
        public UserService(ApplicationDBContext context)
        {
            _context = context;
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
                    UserType = user.UserType.ToString(),
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
                UserType = user.UserType.ToString(),
                Status = user.Status.ToString()
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

    // Loop through each user to update their properties
    foreach (var user in users)
    {
        try
        {
            if (userUpdateMap.TryGetValue(user.Id, out var updateDto))
            {
                // Update fields using data from UserUpdateDto
                if (!string.IsNullOrEmpty(updateDto.UserType))
                    user.UserType = Enum.Parse<UserType>(updateDto.UserType);

                if (!string.IsNullOrEmpty(updateDto.Status))
                    user.Status = Enum.Parse<AccountStatus>(updateDto.Status);

                // Add additional updates as needed
            }
        }
        catch (Exception ex)
        {
            // Log the exception and continue with the next user
            Console.WriteLine($"Error updating user {user.Id}: {ex.Message}");
        }
    }

    // Save changes to the database
    await _context.SaveChangesAsync();
    return true;
}}}




        
