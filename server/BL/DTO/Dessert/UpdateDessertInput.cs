using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Dessert
{
    public class UpdateDessertInput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Price { get; set; }
    }
}
