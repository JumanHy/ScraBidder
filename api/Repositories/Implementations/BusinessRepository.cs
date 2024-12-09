using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace api.Repositories.Implementations
{
    public class BusinessRepository : IBusinessRepository
    {
        private readonly ApplicationDBContext _context;

        public BusinessRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Business> AddAsync(Business business)
        {
            await _context.Businesses.AddAsync(business);
            await _context.SaveChangesAsync();

            return business;
        }

        public async Task<Business> GetByEmailAsync(string email)
        {
            return await _context.Businesses
                .Include(business => business.User)
                .FirstOrDefaultAsync(business => business.User.Email == email);
        }

        public async Task<Business> GetByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.Businesses
                .FirstOrDefaultAsync(business => business.PrimaryPhoneNumber == phoneNumber);
        }


        
        // Save the image paths to the business entity
        
    }
    }

