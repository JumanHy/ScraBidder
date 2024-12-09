using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos
{
    public class NewUserDto
    {
        public string UserId { get; set; }
        public AccountStatus AccountStatus { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

    }
}