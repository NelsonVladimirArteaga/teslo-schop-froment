import { CustomPAgination } from "@/components/custom/CustonPAgination"

import { CustomJumbotron } from "@/shop/componets/CustomJumbotron"
import { ProductsGrid } from "@/shop/componets/ProductsGrid"
import { UseProducts } from "@/shop/hooks/UseProducts"
import { useParams,} from "react-router"


export const GenderPage = () => {
  

  const {data:responseProducts} = UseProducts();

  const {gender}=useParams();

  const genderLabel = gender=== 'men'? 'hombres': gender==='woman'? 'mujeres': 'niños';
  return (
    <div>
       <CustomJumbotron title={`Productos para ${genderLabel}`}/>
            
            <ProductsGrid products={responseProducts?.products||[]}/>
            <CustomPAgination totalPages={responseProducts?.pages||1}/>
    </div>
  )
}
