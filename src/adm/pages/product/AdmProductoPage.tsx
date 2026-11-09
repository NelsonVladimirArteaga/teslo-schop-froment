import {  useNavigate, useParams } from 'react-router';
import { useProducts } from '@/adm/hook/useProducts';
import { CustomLoading } from '@/components/custom/CustomLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/ProductsInterface';
import { toast } from 'sonner';
import { Navigate } from 'react-router';



 export const AdmProductoPage = () => {
  const { id } = useParams();
  const {isError, isLoading, data:product, productMutation}= useProducts(id || '')
  const navigate = useNavigate();
  


  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const description =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleOnSubmit = async(productLLike : Partial<Product> & {files? : File[]}) => {
    await productMutation.mutateAsync(productLLike,{
      onSuccess : (product) =>{
        toast.success('Producto actualizado correctamente',{
          position: 'top-right'
        })
        navigate (`/adm/product/${product.id}`)
      },
      onError: (error)=>{
        console.log(error)
        toast.error('Error al actualizar el producto',{
          position:'top-right'
        })
        navigate ('/adm/products')
      }
      
    })
  }

  

  if(isError) return <Navigate to = '/adm/products'/>
  if(isLoading) {
    return <CustomLoading/>
  }

  if(!product) {
    return <Navigate to = '/adm/products'/>
  }

  
  return <
    ProductForm 
    title={title} 
    description={description} 
    product={product} 
    onSubmit = {handleOnSubmit}/>
  
};

