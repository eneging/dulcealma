import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    // Contenedor principal con fondo suave y padding
    <div className="min-h-[calc(100vh-64px)] bg-pink-50 py-10 px-4 font-sans">
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-rose-100">
        <h2 className="text-4xl font-extrabold mb-8 text-pink-700 text-center font-display">
          Tu Carrito Dulce
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg mb-4">
              Parece que tu carrito está vacío. ¡Es hora de llenarlo de dulzura!
            </p>
            <Link
              to="/store"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-6"> {/* Más espacio entre los ítems */}
              {cart.map((item) => (
                <li
                  key={item.product.id}
                  className="bg-pink-50 border border-rose-200 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Contenido del producto */}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold text-pink-700 mb-1 font-display">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      S/{item.product.price.toFixed(2)} x {item.quantity}
                    </p>
                    <p className="font-extrabold text-rose-600 mt-2 text-lg">
                      Subtotal: S/{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Controles de cantidad y quitar */}
                  <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                    <div className="flex items-center space-x-2">
                      <label htmlFor={`quantity-${item.product.id}`} className="text-md text-gray-600 font-medium">Cantidad:</label>
                      <input
                        id={`quantity-${item.product.id}`}
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.product.id, parseInt(e.target.value))
                        }
                        className="w-20 border border-rose-300 px-3 py-2 rounded-lg text-center text-md focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                      />
                    </div>
                    <button
                      className="text-red-500 hover:text-red-600 font-bold transition-colors text-md p-2 rounded-full hover:bg-red-100" // Botón de quitar más prominente
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label={`Quitar ${item.product.name} del carrito`}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 text-right p-6 bg-pink-100 rounded-2xl shadow-inner border border-rose-200"> {/* Contenedor del total */}
              <h4 className="text-3xl font-extrabold text-pink-800 mb-6 font-display">
                Total del Pedido: S/{total.toFixed(2)}
              </h4>
              <Link
                to="/checkout"
                className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" // Botón de checkout más grande y atractivo
              >
                Continuar al Pago
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;