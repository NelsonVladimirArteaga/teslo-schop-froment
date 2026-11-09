import { AdmTitle } from "@/adm/componets/AdmTitle"
import { CustomPAgination } from "@/components/custom/CustonPAgination"
import { Button } from "@/components/ui/button"
import { UseProducts } from "@/shop/hooks/UseProducts"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { TableProducts } from "./TableProducts"





export const AdmProductsPage = () => {
  const {data:ResponseProduct}= UseProducts();
  
  
  

  return (
    <>
    <div className="flex justify-between items-center">
  <AdmTitle title="Productos" description="Aqui puedes ver y adminitrar tus productos"/>
  <Link to = '/adm/product/new'>
  <Button>
    <PlusIcon/>
    Nuevo producto
  </Button>
  </Link>
    </div>
    
<TableProducts products={ResponseProduct?.products||[]}/>
    
    
<CustomPAgination totalPages={ResponseProduct?.pages || 1}/>

    </>
  )
}
