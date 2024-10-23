import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 這樣可以讓你使用 localhost 和本地網絡 IP
    port: 5173, // 可選的端口號
    strictPort: true, // 可選：不自動使用其他端口
    proxy: {
      '/api': {
        target: 'https://ssstnk.xuanfeidianzi.com', // 目標 API
        changeOrigin: true, // 修改請求的來源
      },
    },
  },
})
