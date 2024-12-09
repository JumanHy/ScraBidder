using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class CompanyServiceDto
    {
     
        public string UserId { get; set; }
         public string BusinessName { get; set; }

        public string? BusinessServices { get; set; } = string.Empty;

    }
}