import { IngredientOutput } from "src/app/models/ingredients";
import { Ingredient } from "src/app/viewModels/ingredients";

export class IngredientsMapper {
  public static toIngredient(model: IngredientOutput): Ingredient {
    return {
      id: model.id,
      name: model.name
    };
  }
}
