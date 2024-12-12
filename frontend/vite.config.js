import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    // Set the chunk size warning limit to 2000 KiB (approximately 2 MiB)
    chunkSizeWarningLimit: 2000,
  },
  plugins: [react()],
})
