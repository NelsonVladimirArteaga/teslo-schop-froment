import type { Product } from "@/interfaces/ProductsInterface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router";
import { PencilIcon } from "lucide-react";

interface Props{
    products : Product[];
}

export const TableProducts = ({products}:Props) => {
  return (
    <div>
        <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
      
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
     
    <TableHead>Imagen</TableHead>
      <TableHead>Nombre</TableHead>
      <TableHead>Precio</TableHead>
      <TableHead>Categoria</TableHead>
      <TableHead>Inventario</TableHead>
      <TableHead>Tallas</TableHead>
      <TableHead className="text-right">Acciones</TableHead>
            
        
      
    </TableRow>
  </TableHeader>
  
            
        {
        products.map((product)=>(
            
        <TableBody >
    <TableRow >
        <TableCell className="font-medium">{product.id.slice(0,2)}</TableCell>        
      <TableCell className="w-20 h-20">
        <img src={product.images[0]} alt={product.slug}/>
      </TableCell>
      <TableCell>
        <Link to ={`/adm/product/${product.title}`}
        className="hover:text-blue-500 underline" >
        {product.title}
        </Link>
        </TableCell>
      <TableCell>{product.price}$</TableCell>
      <TableCell>{product.gender}</TableCell>
      <TableCell>{product.stock} unidades</TableCell>
      <TableCell>{product.sizes.join(', ')}</TableCell>
      
      <TableCell className="text-right">
        <Link to = {`/adm/product/${product.title}`}>
        <PencilIcon className="w-4 h-4 text-blue-500" />
        </Link>
        </TableCell>  
      
      
      </TableRow>
    </TableBody>
            
        
        ))
    }
        
      
    
</Table>
    </div>
  )
}
