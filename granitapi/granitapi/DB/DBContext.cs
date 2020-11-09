using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pomelo.EntityFrameworkCore;
using System.Configuration;
using Microsoft.EntityFrameworkCore;
using granitapi.Models;

namespace granitapi.DB
{
    public class DBContext : DbContext
    {
        public DbSet<OrderModel> Orders { get; set; }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options) { Database.EnsureCreated(); }
        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("server=localhost;UserId=root;Password='';database=granitdb;");
        }
        */
    }
}
