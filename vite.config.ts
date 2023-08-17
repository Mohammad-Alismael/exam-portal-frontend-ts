import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [react(),pluginRewriteAll()],
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
})