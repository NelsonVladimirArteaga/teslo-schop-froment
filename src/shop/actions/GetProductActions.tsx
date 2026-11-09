import { TesloApi } from "@/api/TesloApi"
import type { ProductsResponse } from "@/interfaces/ProductsResponse"

interface Options {
  limit?: string | number,
  offset?: string | number,
  sizes? :string | number,
  gender? :string | number,
  minPrice? : number,
  maxPrice? : number,
  q?:string | number,

  
  
}

export const GetProductActions = async(options:Options):Promise<ProductsResponse> => {

const {limit, offset , sizes, gender, minPrice, maxPrice, q}= options;


const {data} = await TesloApi.get<ProductsResponse>('/products',{
  params:{
    limit,
    offset,
    sizes,
    gender,
    minPrice,
    maxPrice,
    q,
    
  }
});
const productImageURL = data.products.map((products)=>({
  ...products,
  images : products.images.map((images)=>
    `${import.meta.env.VITE_API_URL}/files/product/${images}`
  )
  

}))
console.log(data)

  return {
    ...data,
  products: productImageURL,
  }
}


