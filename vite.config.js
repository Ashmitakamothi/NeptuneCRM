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
          'Cookie': 'token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzYzc4NzQ1ZC0xNWJhLTQxYmUtYjhlMi0xYTJlNzUyMjg3NDMiLCJyb2xlIjpbIklCVXNlciIsIlVzZXIiXSwibmJmIjoxNzc3MDAzNTY4LCJleHAiOjE3NzcwMTA3NjcsImlhdCI6MTc3NzAwMzU2OCwiaXNzIjoiTmVwdHVuZSIsImF1ZCI6Ik5lcHR1bmUifQ.GXl8QThgzD0vBNMzp9yPbPb5JdhtkLC4oRDPanBnlCvWmyUgv-BW516PPxz_kXbmzjE8XkcYrNH4lqkN0Dz7yw',
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
        rewrite: (path) => path.replace(/^\/mt5-api/, ''),
        headers: {
          'Cookie': 'token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzYzc4NzQ1ZC0xNWJhLTQxYmUtYjhlMi0xYTJlNzUyMjg3NDMiLCJyb2xlIjpbIklCVXNlciIsIlVzZXIiXSwibmJmIjoxNzc3MDEwNzg1LCJleHAiOjE3NzcwMTc5ODUsImlhdCI6MTc3NzAxMDc4NSwiaXNzIjoiTmVwdHVuZSIsImF1ZCI6Ik5lcHR1bmUifQ.LxF95cUWzNEsE5TixRMFTsrE_gqW-iQdK0zDZS_vh56pm83d4bbJgqh-bNDPeCVoCbp74bEM9u_BC6pAC6CJxg',
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzYzc4NzQ1ZC0xNWJhLTQxYmUtYjhlMi0xYTJlNzUyMjg3NDMiLCJyb2xlIjpbIklCVXNlciIsIlVzZXIiXSwibmJmIjoxNzc3MDEwNzg1LCJleHAiOjE3NzcwMTc5ODUsImlhdCI6MTc3NzAxMDc4NSwiaXNzIjoiTmVwdHVuZSIsImF1ZCI6Ik5lcHR1bmUifQ.LxF95cUWzNEsE5TixRMFTsrE_gqW-iQdK0zDZS_vh56pm83d4bbJgqh-bNDPeCVoCbp74bEM9u_BC6pAC6CJxg',
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
