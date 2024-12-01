using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class UserUpdateDto
    {
        public string UserId { get; set; }
        public string UserType { get; set; }
        public string Status { get; set; }
    }
}