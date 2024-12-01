using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class PrimaryBusenissinfoDto
    {
        


        public string UserId { get; set; }
        public string PrimaryPhoneNumber { get; set; }

      
        public string PrimaryContactFirstName { get; set; }
        public string PrimaryContactLastName { get; set; }
         public string PrimaryContactEmail { get; set; }
           public string Address { get; set; } // JSO
        public string Images { get; internal set; }
    }
}