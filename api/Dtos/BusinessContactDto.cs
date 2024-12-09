using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class BusinessContactDto
    {     


         public string BusinessPhoneNumber { get; set; }
         public string BusinessEmail { get; set; }

          public string? LinkedIn { get; set; } = string.Empty;
    }
}