import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
        external: [
            "college-table/public/ap-phase-1.js",
            "college-table/public/ap-phase-2.js",
        ]
    }
},
})
