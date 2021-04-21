using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Ingredient
{
    public class UpdateIngredientInput
    {
        public int Id { get; set; }
        public string NewName { get; set; }
    }
}
