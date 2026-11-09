import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetProductIdAccion } from "../accions/GetProductIdAccion"
import type { Product } from "@/interfaces/ProductsInterface"
import { CreateProductAccion } from "../accions/CreateProductAccion"



export const useProducts = (id:string) => {

const QueryClient = useQueryClient();

const query = useQuery({
    queryKey: ['product', {id}],
    queryFn:() => GetProductIdAccion(id),
    staleTime: 1000*60*5,
    retry: false,
  })

 
  const productMutation = useMutation({
    mutationFn : CreateProductAccion,
    onSuccess : (product : Product) =>{
    //invalidad cache
    QueryClient.invalidateQueries ({queryKey: ['product']});
    QueryClient.invalidateQueries({queryKey: ['product', {id: product.id}]})
    // actualizar queryData
    QueryClient.setQueryData(['products',{id: product.id}], product)

    }
  });

  return {
    ...query,
    productMutation,
  }
}
