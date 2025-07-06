// src/components/Menu/CategorySection.tsx
import React, { useRef, useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  product_category_id: number;
}

interface Category {
  id: number;
  name: string;
  items: Product[];
}

const CategorySection = ({ category }: { category: Category }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  if (!visible) return <div ref={ref} className="h-[300px] mb-16" />;

  return (
    <div ref={ref} className="mb-16">
      <h2 className="text-4xl font-semibold text-center mb-8 text-yellow-300 border-b border-yellow-500 pb-2">
        {category.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold text-yellow-200">{item.name}</h3>
                <p className="text-lg font-semibold text-yellow-400">S/ {item.price.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-300 mb-4">{item.description}</p>
            </div>

            <button
              className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg font-semibold"
              onClick={() => alert(`Añadido: ${item.name}`)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
