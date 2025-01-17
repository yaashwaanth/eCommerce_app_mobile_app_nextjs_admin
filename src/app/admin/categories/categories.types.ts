import { ProductWithCategory } from "../products/products.types";
export type CategoriesWithProducts = {
    created_at: string;
    id: number;
    imageUrl: string;
    products: ProductWithCategory[];
    slug: string;
}

export type Category ={
    created_at: string;
    id: number;
    imageUrl: string;
    name: string;
    slug: string
}

export type CategoriesWithProductsResponse = CategoriesWithProducts[];