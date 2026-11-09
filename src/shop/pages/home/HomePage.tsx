

import { CustomPAgination } from "@/components/custom/CustonPAgination"
import { CustomJumbotron } from "@/shop/componets/CustomJumbotron"
import { ProductsGrid } from "@/shop/componets/ProductsGrid"
import { UseProducts } from "@/shop/hooks/UseProducts"






export const HomePage = () => {

const {data : ResponseProducts} = UseProducts();



  return (
    <div >
      <CustomJumbotron title="Todos los productos"/>
      
      <ProductsGrid products={ResponseProducts?.products ||[]}/>
      <CustomPAgination totalPages={ResponseProducts?.pages||1}/>
      
    
    </div>
  )
}
