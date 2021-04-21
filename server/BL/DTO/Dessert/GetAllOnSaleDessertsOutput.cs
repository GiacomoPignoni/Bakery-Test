using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Dessert
{
    public delegate double PriceCalculator(double price, DateTime saleDate);

    public class GetAllOnSaleDessertsOutput
    {
        public List<OnSaleDessertOutput> OnSaleDesserts { get; set; }

        public static GetAllOnSaleDessertsOutput FromDb(ICollection<OnSaleDessert> desserts, PriceCalculator priceCalculator)
        {
            return new GetAllOnSaleDessertsOutput()
            {
                OnSaleDesserts = desserts.Select(x => OnSaleDessertOutput.FromDb(x, priceCalculator)).ToList()
            };
        }
    }

    public class OnSaleDessertOutput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }

        public ICollection<OnSaleDessertOutputIngredient> Ingredients { get; set; }

        public static OnSaleDessertOutput FromDb(OnSaleDessert dessert, PriceCalculator priceCalculator)
        {
            return new OnSaleDessertOutput()
            {
                Id = dessert.Id,
                ImageUrl = dessert.Dessert.ImageUrl,
                Name = dessert.Dessert.Name,
                Price = priceCalculator(dessert.Dessert.Price, dessert.SaleDate),
                Ingredients = dessert.Dessert.Ingredients.Select(i => OnSaleDessertOutputIngredient.FromDb(i)).ToList()
            };
        }
    }

    public class OnSaleDessertOutputIngredient
    {
        public string Name { get; set; }
        public double Amount { get; set; }
        public string Unit { get; set; }

        public static OnSaleDessertOutputIngredient FromDb(DessertIngredient ingredient)
        {
            return new OnSaleDessertOutputIngredient()
            {
                Amount = ingredient.Amount,
                Name = ingredient.Ingredient.Name,
                Unit = ingredient.Unit
            };
        }
    }
}
