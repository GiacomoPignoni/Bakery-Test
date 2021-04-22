import { IngredientOutput } from "./ingredients";

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

export interface GetAllDessertsOutput {
    desserts: DessertOutput[];
}

export interface DessertOutput {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    ingredients: DessertOutputIngredient[];
}

export interface DessertOutputIngredient {
    id: number;
    amount: number;
    unit: string;
    ingredient: IngredientOutput;
}

export interface UpdateDessertInput {
    id: number;
    name: string;
    price: number;
}

export interface PutDessertOnSaleInput {
    dessertId: number;
    quantity: number;
}
