export interface IProduct {
    id: number;
    name: string;
    img: string;
    title: string;
    brand: string;
    price: number;
    categoryId: number
}

export interface Icategory {
    id: number,
    name: string
}