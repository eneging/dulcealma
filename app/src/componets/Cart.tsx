import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
      <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">No hay productos en tu carrito.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.product.id}
                className="bg-white border border-gray-200 p-5 rounded-2xl shadow-md flex justify-between items-center hover:shadow-lg transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.product.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="font-bold text-gray-700 mt-1">
                    Subtotal: s/{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="mt-3 flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Cantidad:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, parseInt(e.target.value))
                      }
                      className="w-16 border border-gray-300 px-2 py-1 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-600 font-medium transition-colors"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">
              Total: s/{total.toFixed(2)}
            </h4>
            <Link
              to="/checkout"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Continuar al Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
