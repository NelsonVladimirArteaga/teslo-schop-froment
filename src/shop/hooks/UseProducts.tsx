import { useQuery } from "@tanstack/react-query"
import { GetProductActions } from "../actions/GetProductActions"
import { useParams, useSearchParams } from "react-router"




export const UseProducts = () => {

  const [searchParams]= useSearchParams();
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') ||1;
  const sizes = searchParams.get('sizes')||'M';
  const price = searchParams.get('price')|| undefined;
  const query = searchParams.get('query')|| '';
  let minPrice = undefined;
  let maxPrice = undefined;
  let q = undefined;
  switch(price){
    case 'any':
    break;
    case '0-50':
      minPrice = 0;
      maxPrice = 50;
      break;
    case '50-100':
      minPrice = 50;
      maxPrice = 100;
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;
    case '200+':
      minPrice = 200;
      maxPrice = undefined;
      break;
  };
    if (query) {q= query} 

  
  const {gender} = useParams();

  const offset= (Number(page)-1) * Number(limit);
 
  return useQuery({
    queryKey : ['products' , {page, limit, offset, sizes, gender, minPrice, maxPrice, q}],
    queryFn : () => GetProductActions({
      limit: Number.isNaN(limit) ? 9 : limit, 
      offset: Number.isNaN(offset) ? 0: offset,
      sizes: Number.isNaN(sizes) ? 'M' : sizes,
      gender: Number.isNaN(gender)? 'women' : gender,
      minPrice,
      maxPrice,
      q,
      

    }),
    staleTime: 1000*60*5,

  })
}
