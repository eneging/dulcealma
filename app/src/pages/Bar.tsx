import React from 'react'

import { mockProducts } from '~/src/componets/mockProducto'
import ProductCard from '~/src/componets/ProductCard'




function Bar() {
    
      const bebidas = mockProducts.filter(p => p.category === 'bebida');
  return (
       <main className="bg-amber-50 min-h-screen py-8 px-4">
         <div className="max-w-7xl mx-auto space-y-16">
           
            {/* Sección: Bebidas */}
        <section>
          <h2 className="text-xl font-bold text-orange-500 mb-3 border-b border-orange-200 pb-1">🍻 Bebidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {bebidas.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

           
           </div></main>
  )
}

export default Bar