
import { useState } from "react";
import { Outlet } from "react-router";
import { AdmHeader } from "../componets/AdmHeader";
import { AdmSidebar } from "../componets/AdmSidebar";



export const AdmLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="bg-gray-50 flex">
      <AdmSidebar
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col">
        <AdmHeader />
        
        <main className="flex-1 p-6">
          <Outlet/>

        </main>
      </div>
      
      </div>
   
  )
}
export default AdmLayout;
