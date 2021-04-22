import { DessertOutput, OnSaleDessertOutput } from "src/app/models/dessert";
import { DessertOnSale } from "src/app/viewModels/dessert-on-sale";
import { Dessert } from "../viewModels/dessert";

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

    public static toDessert(dessert: DessertOutput): Dessert {
        return {
            id: dessert.id,
            imageUrl: dessert.imageUrl,
            name: dessert.name,
            price: dessert.price,
            ingredients: dessert.ingredients.map(x => {
                return {
                    id: x.id,
                    name: x.ingredient.name,
                    unit: x.unit,
                    amount: x.amount
                };
            })
        }
    }
}
