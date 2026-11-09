import { TesloApi } from "@/api/TesloApi"
import type { ResponseAuth } from "../interfaces/Responseauth";


export const RegisterAction = async(email:string, password:string, fullName:string):Promise<ResponseAuth> => {
  try {
    const {data} = await TesloApi.post<ResponseAuth>('/auth/register',{
        email,
        password,
        fullName,
    })
    
    return data;
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error('error en el registro')
    throw new Error ('Error en el registro registro')
    
  }
}
