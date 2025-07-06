// src/components/ProductCardSkeleton.tsx (o donde tengas tus componentes)

import React from 'react';

const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div> {/* Espacio para la imagen */}
            <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div> {/* Título del producto */}
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div> {/* Descripción/Precio */}
                <div className="h-8 bg-gray-200 rounded w-full"></div> {/* Botón */}
            </div>
        </div>
    );
};

export default ProductCardSkeleton;