using System;
using BL.DTO.User;
using DAL.Context;
using System.Linq;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using DAL.Models;
using System.Security.Cryptography;

namespace BL
{
    public class UserManager
    {
        private readonly IConfiguration config;

        private BakeryDbContext dbContext;

        public UserManager(IConfiguration config)
        {
            this.config = config;
            dbContext = new BakeryDbContext();
        }

        public AuthOutput Auth(AuthInput input)
        {
            var md5Password = GetMD5(input.Password);
            var user = dbContext.Users.Where(x => x.Email == input.Email && x.Password == md5Password).SingleOrDefault();
            if(user == null)
            {
                throw new UnauthorizedAccessException();
            }

            var token = buildToken(user);

            return new AuthOutput()
            {
                Token = token
            };
        }

        private string buildToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                config["Jwt:Issuer"],
                config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GetMD5(string value)
        {
            string result;
            using (MD5 hash = MD5.Create())
            {
                result = string.Join
                (
                    "",
                    from ba in hash.ComputeHash
                    (
                        Encoding.UTF8.GetBytes(value)
                    )
                    select ba.ToString("x2")
                );
            }
            return result;
        }
    }
}
