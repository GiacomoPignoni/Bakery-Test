using DAL.Context;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Initializer
{
    public class CustomInitializer : CreateDatabaseIfNotExists<BakeryDbContext>
    {
        protected override void Seed(BakeryDbContext context)
        {
            IList<User> users = new List<User>();

            users.Add(new User() { Email = "luana@bakery.it", Password = "e2849331ecd214f2585db5529db81ed1" });
            users.Add(new User() { Email = "maria@bakery.it", Password = "372e49d242e450b924196e30818b8c1e" });

            context.Users.AddRange(users);

            var darkChocolate = new Ingredient() { Name = "Dark chocolate" };
            var eggWhite = new Ingredient() { Name = "Egg white" };
            var flour = new Ingredient() { Name = "Flour" };
            var sugar = new Ingredient() { Name = "Sugar" };
            var salt = new Ingredient() { Name = "Salt" };
            var yolk = new Ingredient() { Name = "Yolk" };
            var butter = new Ingredient() { Name = "Butter" };
            var powderSugar = new Ingredient() { Name = "Powder sugar" };
            var vanilla = new Ingredient() { Name = "Vanilla" };

            List<Ingredient> ingredients = new List<Ingredient>()
            {
                darkChocolate, eggWhite, flour, sugar, salt, yolk, butter, powderSugar, vanilla
            };

            context.Ingredients.AddRange(ingredients);

            var darkChocolateIn = new DessertIngredient() { Ingredient = darkChocolate, Amount = 75, Unit = "g" };
            var eggWhiteIn = new DessertIngredient() { Ingredient = eggWhite, Amount = 90, Unit = "g" };
            var flourIn = new DessertIngredient() { Ingredient = flour, Amount = 65, Unit = "g" };
            var sugarIn = new DessertIngredient() { Ingredient = sugar, Amount = 90, Unit = "g" };
            var saltIn = new DessertIngredient() { Ingredient = salt, Amount = 1, Unit = "pinch" };
            var yolkIn = new DessertIngredient() { Ingredient = yolk, Amount = 60, Unit = "g" };
            var butterIn = new DessertIngredient() { Ingredient = butter, Amount = 65, Unit = "g" };
            var powderSugarIn = new DessertIngredient() { Ingredient = powderSugar, Amount = 20, Unit = "g" };
            var vanillaIn = new DessertIngredient() { Ingredient = vanilla, Amount = 1, Unit = "unit" };

            var sacher = new Dessert()
            {
                ImageUrl = "https://www.buttalapasta.it/wp-content/uploads/2012/07/xtorta-sacher.jpg.pagespeed.ic.6sWtVr-fHq.jpg",
                Name = "Sacher",
                Price = 29.99,
                Ingredients = new List<DessertIngredient>() { darkChocolateIn, eggWhiteIn, flourIn, sugarIn, saltIn, yolkIn, butterIn, powderSugarIn, vanillaIn }
            };

            context.Desserts.Add(sacher);

            context.OnSaleDesserts.Add(new OnSaleDessert()
            {
                Dessert = sacher,
                SaleDate = DateTime.Now
            });

            base.Seed(context);
        }
    }
}
