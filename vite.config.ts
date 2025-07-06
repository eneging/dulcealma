import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { VitePWA } from 'vite-plugin-pwa'; // ¡Importante!

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    netlifyPlugin(),
    // El plugin VitePWA debe estar aquí
    VitePWA({
      registerType: 'autoUpdate', // O 'prompt' para que el usuario decida actualizar
      // Archivos adicionales que Workbox debe precachear
      // Asegúrate que estos archivos existan en tu carpeta `public` o rutas accesibles
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Dulce Alma', // Nombre completo de tu PWA
        short_name: 'Dulce Alma', // Nombre corto para la pantalla de inicio
        description: '¡Tu rincón dulce favorito en Ica te espera!',
        // Colores de tu marca, basados en tu logo
        theme_color: '#D00000',     // Color para la barra de dirección del navegador/splash screen
        background_color: '#D00000', // Color de fondo del splash screen (donde aparece tu icono al abrir la app)
        icons: [
          {
            src: '/icono.png', // Ruta relativa a la raíz de tu carpeta `public`
            sizes: '192x192',  // Tamaño estándar de icono, preferiblemente cuadrado
            type: 'image/png'
          },
          {
            src: '/icono.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icono.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Para iconos adaptativos en Android
          }
        ]
      },
      // Configuración de Workbox (el cerebro del Service Worker)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // Patrones de archivos a precachear
        // Aumenta el límite de tamaño para permitir imágenes grandes
        // 20 * 1024 * 1024 bytes = 20 MB (ajusta según tus imágenes más grandes)
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024
      },
      // Esto es CRÍTICO: Asegura que el manifiesto se llame `manifest.json`
      // Por defecto es 'manifest.webmanifest', y los navegadores buscan 'manifest.json'
      
    })
  ],
  base: '/', // Asegura que la base de la aplicación sea la raíz
});