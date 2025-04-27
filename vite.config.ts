import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts: ['rajeshthapa69.com.np', 'www.rajeshthapa69.com.np']
  }
})
