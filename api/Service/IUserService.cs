using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Interfaces
{
    public interface IUserService
    {
        Task<DashboardStatsDTO> GetDashboardStatsAsync();


        Task<List<UserDto>> GetAllUsersAsync(); 
        Task<UserDto> GetUserByUsernameOrEmailAsync(string usernameOrEmail);

        Task<bool> UpdateAllUsersAsync(List<UserUpdateDto> userUpdateDto);
        
    }
}
