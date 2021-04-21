using DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.DTO.Ingredient;
using DAL.Models;

namespace BL
{
    public class IngredientManager
    {
        private BakeryDbContext dbContext;

        public IngredientManager()
        {
            dbContext = new BakeryDbContext();
        }

        public GetAllOutput GetAll()
        {
            return GetAllOutput.FromDb(dbContext.Ingredients.ToList());
        }

        public void Add(AddIngredientInput input)
        {
            dbContext.Ingredients.Add(input.ToDbModel());
            dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var ingredient = dbContext.Ingredients.Where(x => x.Id == id).SingleOrDefault();
            if(ingredient == null)
            {
                throw new KeyNotFoundException();
            }

            dbContext.Ingredients.Remove(ingredient);
            dbContext.SaveChanges();
        }

        public void Update(UpdateIngredientInput input)
        {
            var ingredient = dbContext.Ingredients.Where(x => x.Id == input.Id).SingleOrDefault();
            if(ingredient == null)
            {
                throw new KeyNotFoundException();
            }

            ingredient.Name = input.NewName;
            dbContext.SaveChanges();
        }
    }
}
