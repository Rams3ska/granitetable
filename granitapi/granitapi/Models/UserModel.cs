using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace granitapi.Models
{
    public class UserModel
    {
        public uint Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public uint Premission { get; set; } = 1;
    }
}
