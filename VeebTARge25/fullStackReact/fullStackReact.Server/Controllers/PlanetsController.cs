using Microsoft.AspNetCore.Mvc;

namespace fullStackReact.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanetsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
