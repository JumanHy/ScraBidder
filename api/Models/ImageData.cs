using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ImageData
    {
         public string Id { get; set; }
    public string Base64 { get; set; } 
    public DateTime UploadedAt { get; set; } 
    }
}