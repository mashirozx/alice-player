import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgicon from 'vite-plugin-svgicon'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: '/src/' }],
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),
    svgicon({
      include: ['**/icons/**/*.svg'],
    }),
  ],
})
