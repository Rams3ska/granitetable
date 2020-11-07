using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace granitapi.Models
{
    public class OrderModel
    {
        public uint Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Comment { get; set; }
        public uint IsApproved { get; set; }
        public string CreateDate { get; set; }

        public override string ToString()
        {
            return $"ID: {Id} | Name: {FirstName} {LastName} | Email: {Email} | Phone: {Phone} | Comment: {Comment} | Approved: {IsApproved} | Date: {CreateDate}";
        }
    }
}
