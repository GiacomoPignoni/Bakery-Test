using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Ingredient
{
    public class GetAllOutput
    {
        public List<DAL.Models.Ingredient> Ingredients { get; set; }

        public static GetAllOutput FromDb(List<DAL.Models.Ingredient> ingredients)
        {
            return new GetAllOutput()
            {
                Ingredients = ingredients
            };
        }
    }
}
