import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { VitePWA } from 'vite-plugin-pwa'; // <-- IMPORTANTE: ¡Importa VitePWA aquí!

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    netlifyPlugin(),
    // IMPORTANTE: VitePWA debe estar dentro del array de plugins
    VitePWA({
      registerType: 'autoUpdate', // O 'prompt'
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Archivos adicionales a cachear
      manifest: {
        name: 'Dulce Alma',
        short_name: 'Dulce Alma',
        description: '¡Tu rincón dulce favorito en Ica te espera!',
        // Recomiendo los colores que discutimos antes, basados en tu logo
        theme_color: '#D00000', // Ejemplo de rojo vibrante
        background_color: '#D00000', // Ejemplo de rojo vibrante
        icons: [
          {
            src: '/icono.png', // Asegúrate que estas imágenes estén en tu carpeta `public`
            sizes: '192x192',
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
            purpose: 'any maskable'
          }
        ]
      },
      // Otras opciones de Workbox si las necesitas
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: '/',
});