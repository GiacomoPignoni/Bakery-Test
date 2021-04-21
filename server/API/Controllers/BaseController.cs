using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IActionResult Action(Func<object> action)
        {
            try
            {
                var res = action();

                if (res is IActionResult actionResult)
                    return actionResult;

                return Ok(res);
            }
            catch (KeyNotFoundException error)
            {
                return StatusCode(404, error.Message);
            }
            catch (UnauthorizedAccessException error)
            {
                return StatusCode(403, error.Message);
            }
            catch (Exception error)
            {
                return StatusCode(500, error.Message);
            }
        }
    }
}
