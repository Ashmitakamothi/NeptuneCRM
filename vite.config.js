import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/live-api': {
        target: 'https://cabinet.neptunefxcrm.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/live-api/, ''),
        headers: {
          'Origin': 'https://cabinet.neptunefxcrm.com',
          'Referer': 'https://cabinet.neptunefxcrm.com/dashboard',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      },
      '/ws': {
        target: 'https://cabinet.neptunefxcrm.com',
        ws: true,
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://cabinet.neptunefxcrm.com'
        }
      },
      '/mt5-api': {
        target: 'https://mt5.neptunefxcrm.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/mt5-api/, ''),
        headers: {
          'Origin': 'https://cabinet.neptunefxcrm.com',
          'Referer': 'https://cabinet.neptunefxcrm.com/dashboard',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    }
  }
})
