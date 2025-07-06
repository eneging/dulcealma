import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import YapeQR from "../pay/YapeQr"; // Asumo que YapeQR es un componente de pago

// Importar Turf.js para operaciones geoespaciales
import * as turf from '@turf/turf';
// import { useGlobalData } from "../hooks/useGlobalData"; // No usado en este snippet, lo comento si no es necesario

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
    const [locationUrl, setLocationUrl] = useState<string | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [locationObtained, setLocationObtained] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    // ESTADOS para el control de entrega y opción de móvil
    const [isDeliveryAllowed, setIsDeliveryAllowed] = useState<boolean | null>(null); // Indica si el delivery directo es permitido
    const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null); // Mensaje detallado para el usuario
    const [offerMobileDelivery, setOfferMobileDelivery] = useState(false); // Indica si se debe ofrecer la opción de envío por móvil
    const [acceptMobileDelivery, setAcceptMobileDelivery] = useState(false); // Si el cliente ha aceptado el envío por móvil

    const navigate = useNavigate();

    const telefono: string = "51933739769"; // Número de WhatsApp de Dulce Alma

    // --- CONFIGURACIÓN DE ZONAS Y RADIO ---
    // IMPORTANTE: REEMPLAZA ESTAS COORDENADAS CON LAS REALES DE TU NEGOCIO Y ZONAS EN ICA
    // Coordenadas de tu ubicación central / tienda (Longitud, Latitud) en Ica
    // Ejemplo de Ica (aproximado): Divino Maestro H1
    const storeLocation: [number, number] = [-75.7364807231004, -14.079391897810437]; // Longitud, Latitud

    // Radio máximo de entrega en kilómetros desde la ubicación de tu tienda (para delivery directo)
    const maxDeliveryDistanceKm = 5; // Por ejemplo, 5 kilómetros para delivery directo en Ica

    // Zonas Rojas (polígonos de exclusión donde NO haces entregas directas)
    // Dibuja tus polígonos usando herramientas como geojson.io y reemplaza estos ejemplos.
    // EJEMPLO FICTICIO PARA UNA ZONA EN ICA. ¡AJUSTA ESTO A TUS ZONAS REALES!
    const redZones = [
        turf.polygon([[
            [-75.740, -14.085],
            [-75.730, -14.085],
            [-75.730, -14.075],
            [-75.740, -14.075],
            [-75.740, -14.085]
        ]]),
    ];
    // --- FIN DE CONFIGURACIÓN DE ZONAS ---

    // Función para verificar la disponibilidad de entrega según la ubicación del usuario
    const checkDeliveryAvailability = (userLatitude: number, userLongitude: number): { allowed: boolean; message: string; offerMobile: boolean; } => {
        const userPoint = turf.point([userLongitude, userLatitude]);
        const storePoint = turf.point(storeLocation);

        // 1. Verificar si está en una ZONA ROJA (PRIORIDAD MÁXIMA)
        for (const redZone of redZones) {
            if (turf.booleanPointInPolygon(userPoint, redZone)) {
                return {
                    allowed: false, // El delivery directo NO está permitido en zona roja
                    message: "¡Lo sentimos! Tu ubicación se encuentra en una **zona con restricciones de entrega directa**.",
                    offerMobile: true // Ofrecer envío por móvil AUNQUE sea zona de riesgo.
                };
            }
        }

        // 2. Verificar si está dentro del RADIO MÁXIMO DE ENTREGA
        const distance = turf.distance(userPoint, storePoint, { units: 'kilometers' });
        if (distance <= maxDeliveryDistanceKm) {
            return {
                allowed: true, // Se permite el delivery directo si está dentro del radio y no en zona roja
                message: `Tu ubicación está a ${distance.toFixed(1)} km de nuestra tienda. ¡Envío a domicilio disponible!`,
                offerMobile: false // No ofrecer móvil si es directo
            };
        } else { // Si está fuera del radio de entrega directa
            return {
                allowed: false,
                message: `Tu ubicación está a ${distance.toFixed(1)} km, lo que excede nuestro radio de entrega directa de ${maxDeliveryDistanceKm} km.`,
                offerMobile: true // Ofrecer opción de móvil si está fuera del radio directo
            };
        }
    };

    const handleLocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Tu navegador no soporta geolocalización. Por favor, activa los servicios de ubicación.");
            return;
        }

        setLoadingLocation(true);
        setLocationError(null); // Limpiar errores anteriores
        setDeliveryMessage(null); // Limpiar mensajes de entrega anteriores
        setIsDeliveryAllowed(null); // Resetear el estado de la zona de entrega
        setOfferMobileDelivery(false); // Resetear la opción de móvil
        setAcceptMobileDelivery(false); // Resetear la aceptación del móvil

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // URL de Google Maps para mostrar el punto. ¡Asegúrate que esta URL sea correcta para Google Maps!
                // Formato: https://www.google.com/maps/search/?api=1&query=<latitude>,<longitude>
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

                setLocationUrl(mapsUrl);
                setLocationObtained(true);
                setLoadingLocation(false);

                // APLICAR LA LÓGICA DE VERIFICACIÓN DE UBICACIÓN
                const { allowed, message, offerMobile } = checkDeliveryAvailability(latitude, longitude);
                setIsDeliveryAllowed(allowed);
                setDeliveryMessage(message);
                setOfferMobileDelivery(offerMobile); // Establecer si se le ofrece el móvil

                if (!allowed && !offerMobile) { // Si no está permitido Y NO hay opción de móvil (ej: zona roja sin alternativa)
                    setLocationError(message);
                } else { // Si está permitido o si hay opción de móvil
                    setLocationError(null); // No es un "error" bloqueante si se puede ofrecer otra opción
                }

            },
            (error) => {
                console.error("Error obteniendo ubicación:", error);
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationError("Permiso de geolocalización denegado. Por favor, actívalo en la configuración de tu navegador.");
                } else {
                    setLocationError("No se pudo obtener tu ubicación. Inténtalo de nuevo.");
                }
                setLoadingLocation(false);
                // Si hay un error al obtener, asumimos que no es permitido y no ofrecemos móvil
                setIsDeliveryAllowed(false);
                setDeliveryMessage("No se pudo obtener tu ubicación. Por favor, intenta de nuevo o contacta a Dulce Alma.");
                setOfferMobileDelivery(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!name.trim()) newErrors.name = "Tu nombre es importante para tu pedido.";
        if (!phone.trim()) {
            newErrors.phone = "Necesitamos tu número de WhatsApp para coordinar.";
        } else if (!/^\+?\d{9,15}$/.test(phone)) {
            newErrors.phone = "El número de WhatsApp no parece válido. Usa de 9 a 15 dígitos (incluyendo +51 si aplica).";
        }

        // Validación para la opción de envío por móvil
        if (locationObtained && isDeliveryAllowed === false && offerMobileDelivery && !acceptMobileDelivery) {
            newErrors.phone = newErrors.phone || "Por favor, marca la casilla si aceptas el envío por móvil.";
        } else if (locationObtained && isDeliveryAllowed === false && !offerMobileDelivery) {
            // Si la ubicación está en zona roja Y NO hay opción de móvil (según tu lógica de checkDeliveryAvailability),
            // se muestra un error general bloqueante.
            newErrors.phone = newErrors.phone || (deliveryMessage || "Lo sentimos, tu ubicación no permite la entrega.");
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generarMensajeWhatsApp = (orderNumber?: string) => {
        const items = cart
            .map(
                (item) =>
                    `• ${item.product.name} x${item.quantity} = S/${(item.product.price * item.quantity).toFixed(2)}`
            )
            .join("\n");

        const messageDate = new Date().toLocaleString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        let mensaje = `¡Hola! Soy *${name}* de Dulce Alma y quiero hacer el siguiente pedido:\n\n`;

        if (orderNumber) {
            mensaje += `*N° de Pedido: ${orderNumber}*\n`;
        }

        mensaje += `\n*Detalle del Pedido:*\n${items}\n\n*Total a pagar: S/${total.toFixed(2)}*\n\nMi número de contacto es: ${phone}`;

        if (locationUrl) {
            mensaje += `\n\n📍 *Mi ubicación:*\n${locationUrl}`;
        }

        if (deliveryMessage) {
            // Quitar formato Markdown de negritas para el mensaje de WhatsApp si lo tiene
            const cleanDeliveryMessage = deliveryMessage.replace(/\*\*(.*?)\*\*/g, '$1');
            mensaje += `\n\n_Estado de la entrega: ${cleanDeliveryMessage}_`;
        }

        // Mensaje específico si el cliente aceptó el envío por móvil
        if (locationObtained && isDeliveryAllowed === false && offerMobileDelivery && acceptMobileDelivery) {
            mensaje += `\n*¡Cliente ha aceptado el envío por móvil (posible costo adicional)!*`;
        }

        mensaje += `\n\n_Pedido enviado el ${messageDate}_`;

        return `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        // Llamar a la API para guardar la orden
        try {
            const response = await fetch("https://michimarketing.com/api/orders", { // Verifica esta URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_name: name,
                    customer_phone: phone,
                    location_url: locationUrl,
                    total,
                    items: cart.map(item => ({
                        product_id: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                    // Añadir información de delivery para el backend
                    delivery_info: {
                        is_delivery_allowed: isDeliveryAllowed,
                        delivery_message: deliveryMessage,
                        offer_mobile_delivery: offerMobileDelivery,
                        accepted_mobile_delivery: acceptMobileDelivery
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error al guardar pedido:", data.message || data.error);
                alert("Ocurrió un error al registrar tu pedido. Intenta nuevamente.");
                return;
            }

            // Si todo fue bien, abre WhatsApp
            const orderNumber = data.order_number;
            const whatsappUrl = generarMensajeWhatsApp(orderNumber);
            window.open(whatsappUrl, "_blank");

            clearCart();
            navigate("/thanks");
        } catch (err) {
            console.error("Error al enviar pedido:", err);
            alert("No se pudo enviar el pedido. Revisa tu conexión a internet.");
        }
    };

    // La validación del botón de envío:
    const isFormValid = name.trim() && phone.trim() && Object.keys(errors).length === 0;
    const canSubmitOrder = isFormValid && cart.length > 0 && (
        !locationObtained ||
        isDeliveryAllowed === true ||
        (isDeliveryAllowed === false && offerMobileDelivery && acceptMobileDelivery)
    );

    return (
        <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gradient-to-br from-rose-50 to-pink-100 font-sans text-gray-800">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-rose-200">
                <h1 className="text-4xl lg:text-5xl font-serif text-pink-700 mb-6 text-center leading-tight">
                    Finaliza tu pedido 💖
                </h1>
                <p className="text-gray-600 text-center mb-8 text-lg font-light">
                    ¡Casi listo! Solo necesitamos unos detalles para endulzar tu día.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                            Tu Nombre Completo
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full p-4 rounded-xl border-2 ${
                                errors.name ? "border-red-500 focus:ring-red-500" : "border-rose-300 focus:ring-pink-400"
                            } bg-rose-50 text-gray-900 focus:outline-none focus:ring-2 placeholder-gray-500 transition-all duration-200 text-base`}
                            placeholder="Ej: Sofía Rojas"
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                            <p id="name-error" className="text-red-600 text-sm mt-1 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 11-2 0 1 1 0 012 0zm-1-9a1 100-2 2v4a1 1 0 102 0V6z" clipRule="evenodd"></path></svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Campo Número de WhatsApp */}
                    <div>
                        <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                            Tu Número de WhatsApp
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full p-4 rounded-xl border-2 ${
                                errors.phone ? "border-red-500 focus:ring-red-500" : "border-rose-300 focus:ring-pink-400"
                            } bg-rose-50 text-gray-900 focus:outline-none focus:ring-2 placeholder-gray-500 transition-all duration-200 text-base`}
                            placeholder="Ej: +51933739769"
                            aria-invalid={errors.phone ? "true" : "false"}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                        />
                        {errors.phone && (
                            <p id="phone-error" className="text-red-600 text-sm mt-1 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 11-2 0 1 1 0 012 0zm-1-9a1 100-2 2v4a1 1 0 102 0V6z" clipRule="evenodd"></path></svg>
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Botón de Ubicación */}
                    <div>
                        <button
                            type="button"
                            onClick={handleLocation}
                            disabled={loadingLocation}
                            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-lg transition-all duration-300
                                ${loadingLocation
                                    ? "bg-blue-300 cursor-not-allowed text-white"
                                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                                }`}
                        >
                            {loadingLocation ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Obteniendo ubicación...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.25a8.25 8.25 0 0 0-8.25 8.25c0 3.85 2.02 6.84 3.96 8.83a19.58 19.58 0 0 0 2.68 2.28c.38.25.76.5 1.15.74.24.14.51.14.73 0 .39-.23.77-.49 1.15-.74a19.58 19.58 0 0 0 2.68-2.28c1.94-1.99 3.96-4.98 3.96-8.83A8.25 8.25 0 0 0 12 2.25Zm0 10.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z" />
                                    </svg>
                                    Usar mi ubicación actual
                                </>
                            )}
                        </button>

                        {/* Mensajes de estado de la ubicación */}
                        {locationObtained && deliveryMessage && (
                            <p className={`text-sm mt-2 flex items-center justify-center font-semibold text-center ${isDeliveryAllowed ? 'text-green-600' : 'text-orange-600'}`}>
                                {isDeliveryAllowed ? (
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                ) : (
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.303a1 1 0 011.486 0L10 4.6l.257-.297a1 1 0 011.486 0l2 2a1 1 0 01.189.707v7a1 1 0 01-1 1h-8a1 1 0 01-1-1v-7a1 1 0 01.189-.707l2-2zm.743 7.788a1 1 0 10-1.414-1.414L10 9.586l1.707-1.707a1 1 0 10-1.414-1.414L10 8.172l-1.707-1.707a1 1 0 10-1.414 1.414L8.172 10 6.465 11.707a1 1 0 101.414 1.414L10 10.414l1.707 1.707a1 1 0 101.414-1.414L10 9.586l-1.707-1.707z" clipRule="evenodd"></path></svg>
                                )}
                                {deliveryMessage}
                            </p>
                        )}

                        {/* Checkbox para aceptar envío por móvil (solo si se le ofrece la opción) */}
                        {locationObtained && !isDeliveryAllowed && offerMobileDelivery && (
                            <label className="flex items-center mt-3 text-gray-700 text-sm">
                                <input
                                    type="checkbox"
                                    checked={acceptMobileDelivery}
                                    onChange={(e) => setAcceptMobileDelivery(e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-pink-600 rounded-md focus:ring-pink-500 border-gray-300"
                                />
                                <span className="ml-2">Sí, acepto la entrega por móvil (puede tener costo adicional).</span>
                            </label>
                        )}

                        {/* Error general de ubicación (si no se pudo obtener o es zona roja sin alternativa) */}
                        {locationError && (
                            <p className="text-red-600 text-sm mt-2 text-center flex items-center justify-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 100-2 2v4a1 1 0 102 0V6z" clipRule="evenodd"></path></svg>
                                {locationError}
                            </p>
                        )}
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="border-t-2 border-rose-100 pt-6 mt-6">
                        <h2 className="text-2xl font-serif text-pink-700 mb-4">Tu Pedido Dulce</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-500 italic text-center text-base">Tu carrito está esperando ser llenado de delicias.</p>
                        ) : (
                            <ul className="space-y-3 mb-4">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center text-gray-700 text-base">
                                        <span className="font-medium">
                                            {item.product.name} <span className="text-sm text-gray-500">x{item.quantity}</span>
                                        </span>
                                        <span className="font-semibold text-gray-800">S/{(item.product.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t border-rose-200">
                            <p className="text-gray-800">Total:</p>
                            <p className="text-pink-600">S/{total.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Componente YapeQR */}
                    <YapeQR amount={total} />

                    {/* Botón Final */}
                    <button
                        type="submit"
                        disabled={!canSubmitOrder} // Usa la validación combinada 'canSubmitOrder'
                        className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-xl font-bold transition-all duration-300
                            ${canSubmitOrder && cart.length > 0
                                ? "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
                                : "bg-gray-300 cursor-not-allowed text-gray-600"
                            }`}
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 4.907a.75.75 0 0 0-.057.251V20.25a.75.75 0 0 0 .75.75H6.75a.75.75 0 0 0 .75-.75V1.694c-.052-.16-.14-.313-.263-.436L4.057 1.259a.75.75 0 0 0-.91-.187L.057 4.907Zm11.214-.545a.75.75 0 0 0-.75.75V20.25a.75.75 0 0 0 .75.75h6c.038 0 .075-.005.112-.014a.75.75 0 0 0 .638-.87L18.375 1.694a.75.75 0 0 0-.25-.636l-4.125-3.078a.75.75 0 0 0-.91-.187L11.271 4.362Z"/></svg>
                        ¡Enviar mi Pedido Dulce!
                    </button>
                </form>
            </div>
        </div>
    );
}