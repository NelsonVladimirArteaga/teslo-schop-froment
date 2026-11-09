
import axios from 'axios';

const TesloApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
   
});

TesloApi.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer  ${token}`
    }

    return config;
})

export {TesloApi}