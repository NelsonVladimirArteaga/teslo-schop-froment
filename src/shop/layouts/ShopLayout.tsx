import { Outlet } from "react-router"
import { CustomHearder } from "../componets/CustomHearder"
import { CustomFooter } from "../componets/CustomFooter"




export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHearder/>
      
      <Outlet/>
      
      <CustomFooter/>
      
    </div>
    
  )
}
