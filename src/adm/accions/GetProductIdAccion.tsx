import { TesloApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/ProductsInterface"


export const GetProductIdAccion = async(id:string):Promise<Product> => {
    if(!id) throw new Error ('ID no encontrado');
    if(id==='new'){
        return {
            id : 'new',
            title:'',
            price: 0,
            description:'',
            slug:'',
            stock: 0,
            sizes: [],
            gender: [],
            tags: [],
            images:[],
        } as unknown as Product
    }
    const {data}= await TesloApi.get<Product>(`/products/${id}`);

    const images = data.images.map((image) => {
        if(image.includes('http')) return image;
    return `${import.meta.env.VITE_API_URL}/files/products/${image}`;
    });
    return {
       ...data,
       images,

    }
}
