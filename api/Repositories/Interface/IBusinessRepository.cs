using api.Models;
using System.Threading.Tasks;

namespace api.Repositories.Interfaces
{
    public interface IBusinessRepository
    {
        Task<Business> AddAsync(Business business);
        Task<Business> GetByEmailAsync(string email);
        Task<Business> GetByPhoneNumberAsync(string phoneNumber);

     
      
    }
}
