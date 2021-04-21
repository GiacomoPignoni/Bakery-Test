using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.DTO.Dessert;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DessertsController : BaseController
    {
        private DessertManager dessertManager;

        public DessertsController(DessertManager dessertManager)
        {
            this.dessertManager = dessertManager;
        }

        [HttpGet]
        [Route("[action]")]
        [Authorize]
        public IActionResult All()
        {
            return Action(() =>
            {
                return dessertManager.GetAllDesserts();
            });
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult AllOnSale()
        {
            return Action(() =>
            {
                return dessertManager.GetAllOnSaleDesserts();
            });
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public IActionResult Add([FromBody] AddDessertInput input)
        {
            return Action(() =>
            {
                dessertManager.AddDessert(input);
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
                dessertManager.DeleteDessert(id);
                return Ok();
            });
        }

        [HttpPut]
        [Route("[action]")]
        [Authorize]
        public IActionResult Update(UpdateDessertInput input)
        {
            return Action(() =>
            {
                dessertManager.UpdateDessert(input);
                return Ok();
            });
        }

        [HttpPost]
        [Route("[action]")]
        [Authorize]
        public IActionResult PutOnSale([FromBody] PutDessertOnSaleInput input)
        {
            return Action(() =>
            {
                dessertManager.PutDessertOnSale(input);
                return Ok();
            });
        }
    }
}
