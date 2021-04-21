using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class Dessert
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string ImageUrl { get; set; }
        public double Price { get; set; }

        public ICollection<DessertIngredient> Ingredients { get; set; }
    }
}
