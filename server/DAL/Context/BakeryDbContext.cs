using System;
using System.Data.Entity;
using DAL.Initializer;
using DAL.Models;

namespace DAL.Context
{
    public class BakeryDbContext: DbContext
    {
        public BakeryDbContext(): base("BakeryTestDB")
        {
            Database.SetInitializer(new CustomInitializer());
        }

        public DbSet<Dessert> Desserts { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<DessertIngredient> DessertIngredients { get; set; }
        public DbSet<OnSaleDessert> OnSaleDesserts { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
