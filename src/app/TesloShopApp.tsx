import { RouterProvider } from "react-router"
import { AppRouter } from "../AppRouter"
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {Toaster} from 'sonner'
import {  type PropsWithChildren } from "react";
import { CustomLoading } from "@/components/custom/CustomLoading";
import { useAuthStore } from "@/auth/store/AuthStore";

const queryClient = new QueryClient();



const CheckAuthProvider = ({children}: PropsWithChildren)=>{
const {checkAuthStatus}= useAuthStore();
const {isLoading}= useQuery({
  queryKey : ['auth'],
  queryFn : checkAuthStatus,
  retry : false,
  refetchInterval: 1000*60*1
})
if(isLoading) return <CustomLoading/>

  return children;
}




export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      {/* custom provider */}
      <CheckAuthProvider>
        
       <RouterProvider router={AppRouter}/>
      
      </CheckAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      
    </QueryClientProvider>
   
  )
}
