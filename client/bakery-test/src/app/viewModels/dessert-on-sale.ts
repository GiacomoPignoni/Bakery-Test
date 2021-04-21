export interface DessertOnSale {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients: DessertIngredient[];
}

export interface DessertIngredient {
    name: string;
    amount: number;
    unit: string;
}
