using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Ingredient
{
    public class AddIngredientInput
    {
        public string Name { get; set; }

        public DAL.Models.Ingredient ToDbModel()
        {
            return new DAL.Models.Ingredient()
            {
                Name = Name
            };
        }
    }
}
