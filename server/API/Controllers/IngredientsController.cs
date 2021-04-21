using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.DTO.Ingredient;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : BaseController
    {
        private IngredientManager ingredientManager;

        public IngredientsController(IngredientManager ingredientManager)
        {
            this.ingredientManager = ingredientManager;
        }

        [HttpGet]
        [Route("[action]")]
        [Authorize]
        public IActionResult All()
        {
            return Action(() =>
            {
                return ingredientManager.GetAll();
            });
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public IActionResult Add([FromBody] AddIngredientInput input)
        {
            return Action(() =>
            {
                ingredientManager.Add(input);
                return Ok();
            });
        }

        [HttpDelete]
        [Route("[action]/{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            return Action(() =>
            {
                ingredientManager.Delete(id);
                return Ok();
            });
        }

        [HttpPut]
        [Route("[action]")]
        [Authorize]
        public IActionResult Update([FromBody] UpdateIngredientInput input)
        {
            return Action(() =>
            {
                ingredientManager.Update(input);
                return Ok();
            });
        }
    }
}
