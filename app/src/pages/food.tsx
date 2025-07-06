import React from 'react'
import { mockProducts } from '~/src/componets/mockProducto'
import ProductCard from '~/src/componets/ProductCard'

function Food() {
     const comidas = mockProducts.filter(p => p.category === 'comida');

  return (
      <main className="bg-amber-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        
        {/* Sección: Comidas */}
        <section>
          <h2 className="text-xl font-bold text-orange-500 mb-3 border-b border-orange-200 pb-1">🍔 Comidas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {comidas.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        </div></main>
  )
}

export default Food