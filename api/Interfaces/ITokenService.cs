using api.Models;
using System;

namespace api.Interfaces
{
    public interface ITokenService
    {
        // Method signature for creating a token
        Task<string> CreateToken(ApplicationUser user);
    }
}
