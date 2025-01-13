import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill global to avoid the "global is not defined" error
    global: 'window', // 'window' will replace 'global' in the browser context
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', // Update this if needed for your project
    },
  },
})
