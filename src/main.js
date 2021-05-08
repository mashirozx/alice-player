import { createApp } from 'vue'
import App from './App.vue'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import Icon from './components/Icon.vue'

createApp(App)
  .use(VueSvgIconPlugin, {
    tagName: 'svg-icon',
  })
  .component('Icon', Icon)
  .mount('#app')
