import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgicon from 'vite-plugin-svgicon'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: '/src/' },
      { find: 'vue', replacement: 'vue/dist/vue.esm-bundler.js' },
    ],
  },
  server: {
    open: '/src/index.html',
  },
  build: {
    sourcemap: true,
    manifest: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'AlicePlayer',
    },
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // dir: 'build',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return 'vendor'
        //   }
        // },
      },
    },
  },
  plugins: [
    vue(),
    svgicon({
      include: ['**/icons/**/*.svg'],
    }),
  ],
})
