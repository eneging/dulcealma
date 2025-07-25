import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useNavigation } from "react-router";
import { CartProvider } from "./src/context/CartContext";
import type { Route } from "./+types/root";
import "./app.css";
import Header from "./src/componets/nav/header";
import PrincipalNav from "./src/componets/nav/principalNav";
import GlobalSpinner from "./src/componets/GlobalSpinner";

import SliderOver from "./src/componets/nav/sliderOver";
import { CartDrawerProvider } from "./src/componets/CartDrawerContext";

import Footer from "./src/pages/Footer";
import { useLocation } from "react-router";
import WhatsAppButton from "./src/componets/SocialMedia";
import SocialFloatingButtons from "./src/componets/SocialMedia";





export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
   <link rel="manifest" href="/manifest.json" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
         {/* Información de contacto */}
    
      </body>
    </html>
  );
}


export default function App() {
  const location = useLocation();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
   

const isHiddenLayoutRoute =
    location.pathname.startsWith("/dashboard") || location.pathname === "/login";

  return (
    <CartDrawerProvider>
      <CartProvider>
        {!isHiddenLayoutRoute && 
        <Header />}
        {isNavigating && <GlobalSpinner />}
        <Outlet />
        {!isHiddenLayoutRoute && <SliderOver />}
        {!isHiddenLayoutRoute && (
          <div className="flex justify-center">
           <SocialFloatingButtons></SocialFloatingButtons>
            <PrincipalNav />
          </div>
        )}
        {!isHiddenLayoutRoute && <Footer />}
      </CartProvider>
    </CartDrawerProvider>
  );
}



export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
