using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Models;

namespace BL.DTO.Dessert
{
    public class AddDessertInput
    {
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        public AddDessertIngredient[] Ingredients { get; set; }

        public DAL.Models.Dessert ToDbModel(ICollection<DAL.Models.Ingredient> ingredients)
        {
            return new DAL.Models.Dessert()
            {
                Name = Name,
                Price = Price,
                ImageUrl = ImageUrl,
                Ingredients = Ingredients.Select(x => x.ToDbModel(ingredients.Where(y => y.Id == x.IngredientId).SingleOrDefault())).ToList()
            };
        }
    }

    public class AddDessertIngredient
    {
        public int IngredientId { get; set; }
        public double Amount { get; set; }
        public string Unit { get; set; }

        public DessertIngredient ToDbModel(DAL.Models.Ingredient ingredient)
        {
            return new DessertIngredient()
            {
                Amount = Amount,
                Unit = Unit,
                Ingredient = ingredient
            };
        }
    }
}
