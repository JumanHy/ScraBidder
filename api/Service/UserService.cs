using api.Data;
using api.Dtos;
using api.Enums;
using api.Events;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<ApplicationUser> _userManeger;


        // Constructor to inject the ApplicationDBContext into the service
        public UserService(ApplicationDBContext context, EventDispatcher eventDispatcher,UserManager<ApplicationUser>userManager)
        {
            _context = context;
            _eventDispatcher = eventDispatcher;
            _userManeger= userManager;


        }

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

       public async Task<List<UserDto>> GetAllUsersAsync()
{
    var users = await _context.Users.ToListAsync();
    var userDtos = new List<UserDto>();

    foreach (var user in users)
    {
        // Fetch associated individual or business data
        var individual = await _context.Individuals.FirstOrDefaultAsync(i => i.UserId == user.Id);
        var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == user.Id);

        // Determine the user name based on user type
        string userName = individual != null
            ? $"{individual.FirstName} {individual.LastName}"
            : business != null
                ? business.BusinessName
                : user.UserName;

        // Get the user's roles and select the first one
        var roles = (await _userManeger.GetRolesAsync(user)).ToList();
        string role = roles.FirstOrDefault() ?? "No Role Assigned"; // Default role if no roles are assigned

        // Add the user data to the list
        userDtos.Add(new UserDto
        {
            UserId = user.Id,
            UserName = userName,
            Email = user.Email,
            Status = user.Status.ToString(),
            Role = role // Assign the single role
        });
    }

    return userDtos;
}



   
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
        
        public async Task<bool> UpdateUsersStatusAsync(List<UserUpdateDto> userUpdateDtos)
{
    if (userUpdateDtos == null || userUpdateDtos.Count == 0)
        return false;

    // Extract user IDs from DTOs
    var userIds = userUpdateDtos.Select(dto => dto.UserId).ToList();

    // Fetch users from the database
    var users = await _context.Users.Where(u => userIds.Contains(u.Id)).ToListAsync();

    if (users == null || users.Count == 0)
        return false;

    // Create a lookup dictionary for DTOs
    var userUpdateMap = userUpdateDtos.ToDictionary(dto => dto.UserId);

    var updatedUsers = new List<ApplicationUser>();

    foreach (var user in users)
    {
        if (userUpdateMap.TryGetValue(user.Id, out var updateDto))
        {
            try
            {
              
                if (!string.IsNullOrEmpty(updateDto.Status))
                {
                    user.Status = Enum.Parse<AccountStatus>(updateDto.Status);
                    updatedUsers.Add(user);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating user {user.Id}: {ex.Message}");
            
                throw new Exception("Error updating user statuses");
            }
        }
    }

 
    await _context.SaveChangesAsync();

 
    foreach (var user in updatedUsers)
    {
        var userStatusEvent = new UserStatusUpdatedEvent(user.Id, user.Status.ToString());
        await _eventDispatcher.Dispatch(userStatusEvent);
    }

    return true;
}





    }
}





