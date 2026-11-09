import { TesloApi } from '@/api/TesloApi'
import type { ResponseAuth } from '../interfaces/Responseauth';


export const CheckAuthAction = async():Promise<ResponseAuth> => {

    const token = localStorage.getItem('token');
    if(!token) throw new Error ('No hay token en archivos')
    try {
        const {data}= await TesloApi.get<ResponseAuth>('/auth/check-status');
        localStorage.setItem('token', data.token)
    return data;
    } catch (error) {
        localStorage.removeItem('token')
        console.error('Error en acceder a token')
        throw error
        
    }
    
  
}
