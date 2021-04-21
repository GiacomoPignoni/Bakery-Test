import { OnSaleDessertOutput } from "src/app/models/dessert";
import { DessertOnSale } from "src/app/viewModels/dessert-on-sale";

export class DessertMapper {
    public static toDessertOnSale(dessert: OnSaleDessertOutput): DessertOnSale {
        return {
            id: dessert.id,
            imageUrl: dessert.imageUrl,
            name: dessert.name,
            price: dessert.price,
            ingredients: dessert.ingredients.map(x => {
                return {
                    amount: x.amount,
                    name: x.name,
                    unit: x.unit
                };
            })
        };
    }
}
