import { defineConfig } from 'vite'

export default defineConfig({
    // Set base to './' so that the app works correctly on GitHub Pages subpaths
    base: './',
    build: {
        outDir: 'dist',
    }
})
