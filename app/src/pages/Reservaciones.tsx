import React from 'react'


import { mockProducts } from '~/src/componets/mockProducto'
import ProductCard from '~/src/componets/ProductCard'



function Reservaciones() {
    const promociones = mockProducts.filter(p => p.category === 'evento');
  return (
    <main className="bg-amber-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        
     {/* Sección: Promociones o Eventos */}
        <section>
          <h2 className="text-xl font-bold text-orange-500 mb-3 border-b border-orange-200 pb-1">🎉 Promociones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {promociones.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        </div></main>
  )
}

export default Reservaciones