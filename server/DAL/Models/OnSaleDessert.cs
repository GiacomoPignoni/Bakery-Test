using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class OnSaleDessert
    {
        public int Id { get; set; }
        public DateTime SaleDate { get; set; }

        public Dessert Dessert { get; set; }
    }
}
