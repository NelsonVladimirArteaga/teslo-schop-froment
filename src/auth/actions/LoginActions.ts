import { TesloApi } from "@/api/TesloApi"
import type { ResponseAuth } from "../interfaces/Responseauth";


export const LoginActions = async(email:string , password:string):Promise<ResponseAuth> => {

  try {
    const {data} = await TesloApi.post<ResponseAuth>('/auth/login',{
        email,
        password,
    })
    
    
    return data;
    
    
  } catch (error) {
    console.log(error);
    throw error;
    
  }
  
}
