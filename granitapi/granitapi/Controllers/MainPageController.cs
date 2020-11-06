using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace granitapi.Controllers
{
    [Route("api/gallery")]
    [ApiController]
    public class MainPageController : ControllerBase
    {
        // GET: api/<MainPageController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var files = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, @"Static\images\gallery"));

            foreach(var i in files)
            {
                yield return Path.GetFileName(i);
            }
        }
    }
}
