import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: '127.0.0.1',  // bind frontend to IPv4
    port: 5173,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
