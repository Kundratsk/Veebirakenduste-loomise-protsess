using Microsoft.AspNetCore.Mvc;

namespace fullStackReact.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanetsController : ControllerBase
    {
        public IActionResult SchoolIndex()
        {
            return Ok();
        }
    }
}
