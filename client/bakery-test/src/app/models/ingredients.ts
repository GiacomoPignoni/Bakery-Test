export interface GetAllIngredientsOutput {
  ingredients: IngredientOutput[];
}

export interface IngredientOutput {
  id: number;
  name: string;
}
