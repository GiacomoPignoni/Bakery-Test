using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.DTO.Dessert
{
    public class GetAllDessertsOutput
    {
        public List<DAL.Models.Dessert> Desserts { get; set; }

        public static GetAllDessertsOutput FromDb(List<DAL.Models.Dessert> desserts)
        {
            return new GetAllDessertsOutput()
            {
                Desserts = desserts
            };
        }
    }
}
