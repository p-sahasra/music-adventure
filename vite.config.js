import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Replace 'music-adventure' with your actual repo name
  base: '/music-adventure/',
})
