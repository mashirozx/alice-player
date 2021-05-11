import { createApp, reactive, computed } from 'vue'
import Player from './components/Player.vue'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import Icon from './components/Icon.vue'
import parseOptions from './utils/options'

export default class DvaPlayer {
  constructor(playList, options) {
    const config = parseOptions(playList, options)
    this.playList = config.playList
    this.options = config.options
    this.createPlayer()
  }

  createPlayer() {
    const App = {
      setup() {
        const playList = reactive(this.playList)
        const options = reactive(this.options)
        return { playList, options }
      },
      template: `<li>{{ options.container }}</li>`,
    }
    const app = createApp(App)
    app.use(VueSvgIconPlugin, {
      tagName: 'svg-icon',
    })
    app.component('Icon', Icon)
    this.vm = app.mount(this.options.container)
  }
}
