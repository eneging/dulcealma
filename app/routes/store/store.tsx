import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useStoreData } from '../../src/hooks/useStoreData';
import { useCart } from '../../src/context/CartContext';
import OfferProducts from './ofertas';
import Carrusel from '~/src/componets/carrusel';

// Slugify para nombres de archivos
const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// Cargar todas las imágenes de assets usando import.meta.glob (Vite)
const imageModules = import.meta.glob('../../src/assets/*/*.png', { eager: true });

// Obtener la ruta de imagen con fallback
const getImagePath = (categoryId: number, name: string) => {
  const slug = slugify(name);
  const path = `../../src/assets/${categoryId}/${slug}.png`;
  const mod = imageModules[path] as { default: string } | undefined;
  return mod?.default || '/fallback.png'; // fallback en public/
};

export function Store() {
  const { products, categories, loading, error } = useStoreData();
  const { addToCart } = useCart();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  const toggleCategory = useCallback((id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setSelectedCategories([]);
  }, []);

  const filteredProducts = useMemo(() => {
    const lower = debouncedSearch.toLowerCase();
    return products.filter(p => {
      const matchSearch =
        (p.name?.toLowerCase()?.includes(lower) ?? false) ||
        (p.description?.toLowerCase()?.includes(lower) ?? false);

      const matchCat =
        selectedCategories.length === 0 ||
        selectedCategories.includes(Number(p.product_category_id));

      return matchSearch && matchCat;
    });
  }, [products, debouncedSearch, selectedCategories]);

  return (
    <>
      <div className="py-6 lg:py-0 bg-amber-50 justify-center hidden ">
        <OfferProducts />
      </div>

      <main className=" min-h-screen text-white lg:py-[7vh] py-[5vh] px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
       <aside className="md:w-1/4 w-full bg-white rounded-3xl p-6 shadow-xl border border-rose-100">
  <h2 className="text-2xl font-bold text-pink-600 mb-5 font-display">Filtrar Productos</h2>
  <input
    className="w-full mb-5 px-4 py-2 bg-pink-50 border border-rose-200 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-500 transition-colors duration-200"
    placeholder="Buscar por nombre o descripción..."
    value={search}
    onChange={e => setSearch(e.target.value)}
  />
  <div className="flex flex-wrap gap-2 mb-4">
    {categories.map(cat => (
      <button
        key={cat.id}
        onClick={() => toggleCategory(cat.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
          selectedCategories.includes(cat.id)
            ? 'bg-rose-500 text-white shadow-md'
            : 'bg-pink-200 text-pink-700 hover:bg-pink-300'
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>
  {(search || selectedCategories.length > 0) && (
    <button
      onClick={clearFilters}
      className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200"
    >
      Limpiar filtros
    </button>
  )}
</aside>

          {/* Product Grid */}
        <section className="md:w-3/4 w-full">
  {loading ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-pink-200 rounded-2xl p-4 animate-pulse h-72 shadow-lg" />
      ))}
    </div>
  ) : error ? (
    <div className="text-red-600 text-center text-lg py-10 font-bold">
      ¡Oh, no! Ocurrió un error al cargar los productos. Por favor, intenta de nuevo más tarde.
      {/* Puedes quitar la línea de abajo en producción para no mostrar el error crudo al usuario */}
      {/* <p className="mt-2 text-sm text-red-400">{error}</p> */}
    </div>
  ) : filteredProducts.length === 0 ? (
    <div className="text-center text-gray-600 mt-10 p-5 bg-white rounded-2xl shadow-lg border border-rose-100">
      <p className="text-lg mb-4">No se encontraron productos que coincidan con tus criterios.</p>
      <button
        onClick={clearFilters}
        className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
      >
        Borrar Búsqueda y Filtros
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <div
          key={product.id}
          className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-300 border border-rose-100 cursor-pointer flex flex-col"
        >
          <img
            src={`/assets/${product.product_category_id}/${product.name}.png`}
            alt={product.name}
            className="w-full h-48 lg:h-56 object-cover object-center transform hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.currentTarget.src = '/fallback.png'; e.currentTarget.alt = 'Imagen no disponible'; }}
          />
          <div className="p-4 text-center flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-pink-700 mb-1 font-display leading-tight">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">{product.description}</p>
            <p className="text-2xl font-extrabold text-rose-600 mb-4 font-display">S/ {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-auto w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</section>
        </div>
      </main>
    </>
  );
}

export default Store;
