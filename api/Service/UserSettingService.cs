using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Service
{
    public class UserSettingService : IUserSettingService
    {
        private readonly ApplicationDBContext _context;

        // Constructor to inject the DbContext
        public UserSettingService(ApplicationDBContext context)
        {
            _context = context;
        }
     private readonly string _imagePath;

        public UserSettingService(ApplicationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _imagePath = configuration.GetValue<string>("ImageStoragePath"); // Configure this path in your appsettings.json
        }







        // Method to update user information
        public async Task<PrimaryBusenissinfoDto> GetBusinessInfoAsync(string userId)
        {
            var business = await _context.Businesses
                                          .Where(b => b.UserId == userId)
                                          .FirstOrDefaultAsync();

            if (business == null)
                return null;

            return new PrimaryBusenissinfoDto
            {
                UserId = business.UserId,
                PrimaryPhoneNumber = business.PrimaryPhoneNumber,
                PrimaryContactFirstName = business.PrimaryContactFirstName,
                PrimaryContactLastName = business.PrimaryContactLastName,
                PrimaryContactEmail = business.PrimaryContactEmail,
                Address = business.Address
            };
        }

        // Method to update the business info
        public async Task<bool> UpdateBusinessInfoAsync(PrimaryBusenissinfoDto businessDto)
        {
            var business = await _context.Businesses
                                          .Where(b => b.UserId == businessDto.UserId)
                                          .FirstOrDefaultAsync();

            if (business == null)
                return false;

            // Update business info with values from DTO
            business.PrimaryPhoneNumber = businessDto.PrimaryPhoneNumber;
            business.PrimaryContactFirstName = businessDto.PrimaryContactFirstName;
            business.PrimaryContactLastName = businessDto.PrimaryContactLastName;
            business.PrimaryContactEmail = businessDto.PrimaryContactEmail;
            business.Address = businessDto.Address;

            // Mark the entity as modified and save changes
            _context.Businesses.Update(business);
            await _context.SaveChangesAsync();

            return true;
        }

        // Get the company service info by UserId
        public async Task<CompanyServiceDto> GetCompanyServiceByUserIdAsync(string userId)
        {
            var companyService = await _context.Businesses
                .FirstOrDefaultAsync(B => B.UserId == userId);

            // If no company service is found, return null
            if (companyService == null)
                return null;

            return new CompanyServiceDto
            {
                UserId = companyService.UserId,
                BusinessName = companyService.BusinessName,
                BusinessServices = companyService.BusinessServices
            };
        }

        // Update the company service info
        public async Task<CompanyServiceDto> UpdateCompanyServiceAsync( CompanyServiceDto companyServiceDto)
        {
            var companyService = await _context.Businesses
                .FirstOrDefaultAsync(B => B.UserId == companyServiceDto.UserId);

            // If the company service is not found, return null
            if (companyService == null)
                return null;

            // Update the company's details with the new values from the DTO
              companyService.UserId= companyServiceDto.UserId;
            companyService.BusinessName = companyServiceDto.BusinessName;
            companyService.BusinessServices = companyServiceDto.BusinessServices;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            // Return the updated company service DTO
            return companyServiceDto;
        }

        public async Task<UserSettingUpdateDto> GetUserInfoAsync(string userId)
        {
            var userInfo = await _context.Individuals
                .Include(i => i.User)
                .Where(i => i.UserId == userId)
                .Select(i => new UserSettingUpdateDto
                {
                    UserId = i.UserId,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Email = i.User.Email,
                    PhoneNumber = i.PhoneNumber,
                    Address = i.Address
                })
                .FirstOrDefaultAsync();

            return userInfo;
        }

        // Update user information
        public async Task<bool> UpdateUserInfoAsync(UserSettingUpdateDto userUpdateDto)
        {
            var individual = await _context.Individuals
                .Include(i => i.User)
                .FirstOrDefaultAsync(i => i.UserId == userUpdateDto.UserId);

            if (individual == null)
                return false;

            // Update Individual properties
            individual.FirstName = userUpdateDto.FirstName;
            individual.LastName = userUpdateDto.LastName;
            individual.Address = userUpdateDto.Address;

            // Update ApplicationUser properties
            individual.User.Email = userUpdateDto.Email;
            individual.PhoneNumber = userUpdateDto.PhoneNumber;

            await _context.SaveChangesAsync();
            return true;





            
        }

        
        
        


       


        
    }
}




       
    

