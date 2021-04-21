using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class DessertIngredient
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public string Unit { get; set; }

        public Ingredient Ingredient { get; set; }
    }
}
