using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _Key;

        private readonly UserManager<ApplicationUser> _userManager;

        public TokenService(IConfiguration config, UserManager<ApplicationUser> userManager)
        {
            _config = config;
            _Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigninKey"]));
            _userManager = userManager;
        }

        public async Task<string> CreateToken(ApplicationUser user)
        {
            // Get roles for the user
            var userRoles = await _userManager.GetRolesAsync(user);

            // Create claims
            var claims = new List<Claim>
    {

        new Claim(JwtRegisteredClaimNames.Email, user.Email),
         new Claim(JwtRegisteredClaimNames.NameId, user.Id),
        new Claim(JwtRegisteredClaimNames.GivenName, user.UserName)
    };

            // Add roles to the claims
            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            // Generate signing credentials
            var creds = new SigningCredentials(_Key, SecurityAlgorithms.HmacSha512Signature);

            // Token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"]
            };

            // Create the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the written token
            return tokenHandler.WriteToken(token);
        }

    }
}
