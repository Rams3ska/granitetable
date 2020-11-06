using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using granitapi.Models;
using System.IdentityModel.Tokens.Jwt;
using TokenApp;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace granitapi.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private List<UserModel> people = new List<UserModel>
        {
            new UserModel { Login="test", Password="12345", Id=0 },
            new UserModel { Login="sosok", Password="55555", Id=1 }
        };
        
        [HttpPost("token")]
        public IActionResult Token([FromBody]Auth auth)
        {
            var identity = GetIdentity(auth);
            if (identity == null)
            {
                return BadRequest(new { err = "Invalid login or password." });
            }

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                login = identity.Name
            };

            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(Auth auth)
        {
            UserModel UserModel = people.FirstOrDefault(x => x.Login == auth.Login && x.Password == auth.Password);
            if (UserModel != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, UserModel.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "admin")
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            return null;
        }
    }
}
