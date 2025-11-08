import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin to copy PDF.js worker to public directory
    {
      name: 'copy-pdf-worker',
      buildStart() {
        const workerSrc = join(process.cwd(), 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
        const workerDest = join(process.cwd(), 'public', 'pdf.worker.min.mjs');
        
        if (existsSync(workerSrc) && !existsSync(workerDest)) {
          try {
            copyFileSync(workerSrc, workerDest);
            console.log('✓ Copied PDF.js worker to public directory');
          } catch (err) {
            console.warn('Could not copy PDF.js worker:', err);
          }
        }
      }
    }
  ],
  // Ensure .env files are loaded from root
  envDir: '.',
  envPrefix: 'VITE_',
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
})
