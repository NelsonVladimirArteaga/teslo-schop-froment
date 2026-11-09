/* eslint-disable @typescript-eslint/no-unused-vars */
import { TesloApi } from "@/api/TesloApi";
import type { Product } from "@/interfaces/ProductsInterface";
import { Sleep } from "@/lib/Sleep";



export const CreateProductAccion = async(productLike: Partial <Product> & {files? : File[]}):Promise<Product> => {

await Sleep(1500);

const {id, user, images=[], files = [], ...rest}= productLike;
//preparacion de imagenes
if(files.length>0){
 const newImagenesName =  await uploadFiles(files);
 images.push(...newImagenesName)
}


const isCreating = id === 'new';
rest.stock = Number(rest.stock||0);
rest.price = Number (rest.price ||0);

const imagesToSave = images.map(image =>{
    if(image.includes('http')) return image.split('/').pop() || '';
    return image;
})

const {data} = await TesloApi<Product>({
    url : isCreating? '/products' : `/products/${id}`,
    method: isCreating? 'POST' : 'PATCH',
    data: {
        ...rest,
        images: imagesToSave,
    }

})
return {
    ...data,
    images: data.images.map((image:string)=>{
        if (image.includes('http')) return image;
        return `${import.meta.env.VITE_API_URL}/files/product/${image}`

    })
}
}
export interface ResponseFile {
    secureUrl: string;
    fileName:  string;
}
  
const uploadFiles = async(files:File[]) =>{
    const uploadPromises = files.map(async file=>{
        const formData = new FormData();
        formData.append('file', file);
        const {data}= await TesloApi <ResponseFile>({
            url:'/files/product',
            method: 'POST',
            data:formData,
        })
        return data.fileName;
    })

    const uploadedFileNames =  await Promise.all(uploadPromises);
    return uploadedFileNames;
}