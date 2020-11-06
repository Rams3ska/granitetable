using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TokenApp
{
    public class AuthOptions
    {
        public const string ISSUER = "granit";
        public const string AUDIENCE = "granit_admin";
        const string KEY = "!!!_g4yn1gg4_!!!"; 
        public const int LIFETIME = 30; // время жизни токена

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}