using System.Threading.Tasks;
using api.Dtos;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using api.Data;

namespace api.Interfaces
{
    public interface IUserSettingService
    {
        Task<PrimaryBusenissinfoDto> GetBusinessInfoAsync(string userId);
        Task<bool> UpdateBusinessInfoAsync(PrimaryBusenissinfoDto businessDto);

        Task<CompanyServiceDto> GetCompanyServiceByUserIdAsync(string userId);
        Task<CompanyServiceDto> UpdateCompanyServiceAsync(CompanyServiceDto companyServiceDto);

        Task<UserSettingUpdateDto> GetUserInfoAsync(string userId);
        Task<bool> UpdateUserInfoAsync(UserSettingUpdateDto userUpdateDto);


       

        // Method to upload images (exactly three images)
       
        
    }
}
