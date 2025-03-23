import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from "vite-plugin-svgr";
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  base: "",
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Copy 404.html after build
      plugins: [
        {
          name: 'copy-404',
          writeBundle() {
            const src = path.resolve(__dirname, '404.html');
            const dest = path.resolve(__dirname, 'dist/404.html');
            fs.copyFileSync(src, dest);
            console.log('404.html copied to dist!');
          },
        },
      ],
    },
  },
})
