import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    allowedHosts: ['grishmainvest.com', 'www.grishmainvest.com'],
    proxy: {
      '/fenegosida': {
        target: 'https://www.fenegosida.org',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fenegosida/, ''),
      },
    },
  }
})
