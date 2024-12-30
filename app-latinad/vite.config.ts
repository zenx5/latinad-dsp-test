import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(),react()],
  resolve: {
    alias:{
      "@": resolve(__dirname, "src")
    }
  }
})
