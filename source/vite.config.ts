import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { viteSingleFile } from "vite-plugin-singlefile"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/ui-dictionary/",
  build: { outDir: process.env.BUILD_OFFLINE ? "dist-offline" : "dist" },
  plugins: [react(), tailwindcss(), ...(process.env.BUILD_OFFLINE ? [viteSingleFile()] : [])],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
