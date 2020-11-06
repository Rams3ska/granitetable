using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using granitapi.DB;
using granitapi.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Authorization;
using System.Security.Policy;
using System.Diagnostics;

namespace granitapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        public DBContext db;

        public OrderController(DBContext context)
        {
            db = context;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<OrderModel>>> Get()
        {
            return await db.Orders.ToListAsync();
        }

        [HttpGet]
        public IEnumerable<OrderModel> Get(bool approved = false)
        {
            var filtred = db.Orders.ToList();

            if(approved)
            {
                filtred = filtred.Where(x => x.IsApproved == true).ToList();
            }

            return filtred;
        }

        // GET api/<OrderController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderModel>> Get(uint id)
        {
            var result = await db.Orders.FirstOrDefaultAsync<OrderModel>(x => x.Id == id);

            if (result == null)
                return NotFound();

            return result;
        }

        // POST api/<OrderController>
        [AllowAnonymous]
        [HttpPost("add")]
        public void Post([FromBody] string FirstName)
        {
            Debug.WriteLine(FirstName);
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
    }
}
