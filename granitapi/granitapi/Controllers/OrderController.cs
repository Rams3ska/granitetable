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

            if (approved)
            {
                filtred = filtred.Where(x => x.IsApproved == 1).ToList();
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
        public IActionResult Post([FromBody] OrderModel order)
        {
            var exist = db.Orders.Where(x => x.Phone == order.Phone || x.Email == order.Email).FirstOrDefault();

            if(exist != null)
            {
                return Ok(new { err = "Данный пользователь уже есть в базе!" });
            }

            order.CreateDate = DateTime.Now.ToString("R");
            order.IsApproved = 0;

            db.Orders.Add(order);
            db.SaveChanges();

            return Ok(new { msg = "Форма успешно отправлена!" });
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
    }
}
