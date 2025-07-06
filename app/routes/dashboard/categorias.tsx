import React, { useEffect, useState } from 'react'

import {
  
  getCategories,

} from "../../src/api";
import { toast } from 'react-toastify';

interface Category {
  id: number;
  name: string;
}

function categoriasAdmin() {

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
const [Categories, setCategories] = useState<Category[]>();

useEffect(() => {
  const fetchData = async () => {
    try {
        
        setLoading(true);
        setError("");

         const [categoriesData] = await Promise.all([
          getCategories()
         ])

        setCategories(categoriesData);


    } catch (err: any) {
              console.error("Error cargando datos:", err);
              const errorMessage = `Error al cargar productos o categorías: ${err.message || 'Error desconocido'}`;
              setError(errorMessage);
              toast.error(errorMessage); // Show toast for initial load error
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);
    


  return (
    <div className='bg-amber-400 text-black px-[30vw]'>


        {Categories?.map(cat => (
            <li>{cat.name}</li>
        ))}
    </div>
  )
}

export default categoriasAdmin