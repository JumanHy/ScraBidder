using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class UserCheckRequestDto
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}