import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // optimizeDeps: {
  //   // This tells Vite to pre-bundle the package correctly
  //   include: ['react-map-gl', 'mapbox-gl']
  // },
})