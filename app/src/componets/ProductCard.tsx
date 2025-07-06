import type { Product } from "../types";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (

      <div className="flex flex-col justify-between bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 p-4 w-full h-full">
      <div>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="rounded-xl bg-gray-100 object-cover w-full h-52 sm:h-60 lg:h-64 xl:h-72 mb-4"
        />
        <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-lg font-semibold text-orange-500">s/{product.price.toFixed(2)}</span>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
          onClick={() => addToCart(product)}
        >
          Agregar
        </button>
      </div>
    </div>
    
  );
};

export default ProductCard;
