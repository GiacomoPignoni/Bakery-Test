using BL;
using BL.DTO.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private UserManager userManager;

        public UserController(UserManager userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult Auth([FromBody] AuthInput input)
        {
            return Action(() =>
            {
                var output = userManager.Auth(input);
                return output;
            });
        }
    }
}
