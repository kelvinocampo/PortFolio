import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@C": path.resolve(__dirname, 'src/Components'),
      "@A": path.resolve(__dirname, 'src/assets'),
      "@D": path.resolve(__dirname, 'src/Data'),
    }
  }
})
