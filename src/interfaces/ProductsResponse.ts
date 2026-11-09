import type { Product } from "./ProductsInterface";


export interface ProductsResponse {
    count:    number;
    pages:    number;
    products: Product[];
}







