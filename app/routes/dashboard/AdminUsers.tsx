import React, { useEffect, useState } from 'react'

import {
 getUsers, 
} from "../../src/api"; 
import { toast } from 'react-toastify';

interface User {
 
  name: string;
  email: string;
  password: string

}



function AdminUsers() {

 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
  const [Users, setUsers] = useState<User[]>([]);

useEffect(() =>{
  const fetchData = async () => {
     try {
      setLoading(true);
      setError("");

      const [userData] = await Promise.all([
       getUsers()
      ])
        
      setUsers(userData);
     
      
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
    <div className='bg-amber-300 text-black px-[40vw]'>

{
Users.map(use => (
  <li>{use.name} </li>
))

}

    </div>
  )
}

export default AdminUsers