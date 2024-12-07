using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Data
{
    public class UserSettingUpdateDto
    {[Required]
    public string UserId { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
     [Required]

        public string Email { get; set; }
         [Required]
        public string PhoneNumber { get; set; }
   
    }
}