import { createApp } from 'vue'
import App from './App.vue'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import Icon from './components/Icon.vue'
import parseOptions from './utils/options'

const app = createApp(App)
  .use(VueSvgIconPlugin, {
    tagName: 'svg-icon',
  })
  .component('Icon', Icon)
  .mount('#app')

export default class Player {
  constructor(options) {
    this.options = parseOptions(options)
  }

  createPlayer() {
    const app = createApp(App)
    app.use(VueSvgIconPlugin, {
      tagName: 'svg-icon',
    })
    app.component('Icon', Icon)
    app.mount(this.options.container)
  }
}
