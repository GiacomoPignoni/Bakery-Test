export interface Dessert {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    ingredients: DessertIngredient[];
}

export interface DessertIngredient {
    id: number;
    amount: number;
    unit: string;
    name: string;
}
