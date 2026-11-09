import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router"

interface Props {
    totalPages: number,
};

export const CustomPAgination = ({totalPages}:Props) => {
  

    const [searchParams, setSearchParams]= useSearchParams();
    const queryPage = searchParams.get('page')?? '1';

    const page= Number.isNaN(+queryPage) ? 1 : queryPage ;

    

    const handlePageChange = (newDate:number) => {
        setSearchParams((prev)=>{
            prev.set('page',newDate.toString())
            return prev;
            
        })
        }


  return  ( 
    <div className="flex justify-center items-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(+page - 1)}
                    disabled={+page === 1}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: totalPages }).map((_,index) => (
                      <Button
                        key={index}
                        variant={+page === index +1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(index+1)}
                        className="h-9 w-9 p-0"
                      >
                        {index+1}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(+page + 1)}
                    disabled={+page === totalPages}
                    className="h-9 w-9 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

  )

}
  