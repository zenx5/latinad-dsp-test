import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(),react()],
  resolve: {
    alias:{
      "@": resolve(__dirname, "src")
    }
  }
})
