// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ESTA LINEA ES CLAVE PARA EVITAR 404 EN VERCEL
})
