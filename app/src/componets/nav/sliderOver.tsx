import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";
import { useCartDrawer } from "../CartDrawerContext";

export default function SliderOver() {
  const { isOpen, closeDrawer } = useCartDrawer();
  const { cart, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Dialog open={isOpen} onClose={closeDrawer} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-pink-200/40 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-pink-50 text-pink-600 shadow-2xl rounded-l-2xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-2xl font-heading font-bold text-pink-500">
                      Tu carrito
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={closeDrawer}
                        className="relative -m-2 p-2 text-pink-500 hover:text-pink-700"
                      >
                        <span className="sr-only">Cerrar panel</span>
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <p className="text-center text-blue-500">
                        Tu carrito está vacío 🧁
                      </p>
                    ) : (
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-pink-200">
                          {cart.map((item) => (
                            <li key={item.product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-pink-200 bg-white">
                                <img
                                  alt={item.product.name}
                                  src={`/assets/${item.product.product_category_id}/${item.product.name}.png`}
                                  className="size-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium">
                                    <h3 className="text-pink-600">{item.product.name}</h3>
                                    <p className="ml-4 text-pink-600">
                                      S/.{item.product.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-blue-500">
                                    {item.product.category.name}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                  <p className="text-blue-600">
                                    Cantidad: {item.quantity}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="font-medium text-red-500 hover:text-red-700"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-pink-200 px-4 py-6 sm:px-6 bg-pink-100 rounded-b-2xl">
                  <div className="flex justify-between text-base font-semibold text-pink-600">
                    <p>Subtotal</p>
                    <p>S/.{subtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-blue-600">
                    El envío y los impuestos se calculan en el checkout.
                  </p>

                  <div className="mt-6">
                    <a
                      href="/checkout"
                      className="w-full flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-base font-semibold text-white shadow hover:bg-pink-600 transition-all duration-300"
                    >
                      Proceder al pago
                    </a>
                  </div>

                  <div className="mt-6 flex justify-center text-center text-sm text-blue-500">
                    <p>
                      o{" "}
                      <button
                        type="button"
                        onClick={closeDrawer}
                        className="font-medium text-pink-500 hover:text-pink-600"
                      >
                        seguir comprando <span aria-hidden="true">→</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
