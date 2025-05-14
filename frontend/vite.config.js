import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "skillsync-9o",
    project: "javascript-react"
  })],

  server: {
    port:5174,
    proxy: {
      '/api':{
        target:'http://localhost:3000',
      } 
    },
    cors:true,
  },

  build: {
    sourcemap: true
  }
})