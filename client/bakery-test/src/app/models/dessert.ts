export interface GetAllOnSaleDessertsOutput {
    onSaleDesserts: OnSaleDessertOutput[];
}

export interface OnSaleDessertOutput {
    id: number;
    name: string;
    imageUrl: string;
    price: number;

    ingredients: OnSaleDessertOutputIngredient[];
}

export interface OnSaleDessertOutputIngredient {
    name: string;
    amount: number;
    unit: string;
}

export interface AddDessertInput {
    name: string;
    imageUrl: string;
    price: number;
    ingredients: AddDessertIngredient[];
}

export interface AddDessertIngredient {
    ingredientId: number;
    amount: number;
    unit: string;
}
