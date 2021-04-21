using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.DTO.Dessert;
using DAL.Context;
using DAL.Models;
using System.Data.Entity;

namespace BL
{
    public class DessertManager
    {
        private BakeryDbContext dbContext;

        public DessertManager()
        {
            dbContext = new BakeryDbContext();
        }

        public GetAllDessertsOutput GetAllDesserts()
        {
            dbContext.Desserts.Include(x => x.Ingredients.Select(x => x.Ingredient)).ToList();
            return GetAllDessertsOutput.FromDb(dbContext.Desserts.ToList());
        }

        public GetAllOnSaleDessertsOutput GetAllOnSaleDesserts()
        {
            var dateLimit = DateTime.Now.AddDays(-4);
            var desserts = dbContext.OnSaleDesserts.Include(x => x.Dessert.Ingredients.Select(x => x.Ingredient)).Where(x => x.SaleDate > dateLimit);
            return GetAllOnSaleDessertsOutput.FromDb(desserts.ToList(), onSalePriceCalculator);
        }

        public void AddDessert(AddDessertInput input)
        {
            var ingredients = dbContext.Ingredients.ToList().Where(x => input.Ingredients.Any(y => y.IngredientId == x.Id));
            if(ingredients.Count() != input.Ingredients.Length)
            {
                throw new KeyNotFoundException("Some ingredients doesn't exists");
            }
            dbContext.Desserts.Add(input.ToDbModel(ingredients.ToList()));
            dbContext.SaveChanges();
        }

        public void DeleteDessert(int id)
        {
            var dessert = dbContext.Desserts.Include(x => x.Ingredients).Where(x => x.Id == id).SingleOrDefault();
            if(dessert == null)
            {
                throw new KeyNotFoundException("Dessert not found");
            }

            foreach(var ingredient in dessert.Ingredients)
            {
                dbContext.DessertIngredients.Remove(ingredient);
            }

            dbContext.Desserts.Remove(dessert);
            dbContext.SaveChanges();
        }

        public void UpdateDessert(UpdateDessertInput input)
        {
            var dessert = dbContext.Desserts.Where(x => x.Id == input.Id).SingleOrDefault();
            if (dessert == null)
            {
                throw new KeyNotFoundException("Dessert not found");
            }

            if(input.Name != null)
            {
                dessert.Name = input.Name;
            }

            if(input.Price != null)
            {
                dessert.Price = input.Price.Value;
            }

            dbContext.SaveChanges();
        }

        public void PutDessertOnSale(PutDessertOnSaleInput input)
        {
            var dessert = dbContext.Desserts.Where(x => x.Id == input.DessertId).SingleOrDefault();
            if(dessert == null)
            {
                throw new KeyNotFoundException("Dessert not found");
            }

            var onSaleDesserts = new List<OnSaleDessert>();
            for(int i = 0; i < input.Quantity; i++)
            {
                onSaleDesserts.Add(new OnSaleDessert()
                {
                    Dessert = dessert,
                    SaleDate = DateTime.Now
                });
            }
            dbContext.OnSaleDesserts.AddRange(onSaleDesserts);
            dbContext.SaveChanges();
        }

        private double onSalePriceCalculator(double price, DateTime saleDate)
        {
            var dayDiff = Math.Floor((DateTime.Now - saleDate).TotalDays);

            if(dayDiff == 0)
            {
                return price;
            }
            else if(dayDiff == 1)
            {
                return price * 0.8;
            }
            else if(dayDiff == 2)
            {
                return price * 0.2;
            }

            return 0;
        }
    }
}
