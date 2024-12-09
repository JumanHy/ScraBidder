using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace api.Services
{
    public class NameUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            Console.WriteLine(connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return connection.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}