import { createApp, h } from 'vue'
import Player from './components/Player.vue'
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'
import Icon from './components/Icon.vue'
import parseOptions from './utils/options'

class DvaPlayer {
  constructor(playList, options) {
    const config = parseOptions(playList, options)
    this.playList = config.playList
    this.options = config.options
    this.createPlayer()
  }

  createPlayer() {
    const { playList, options } = this
    const App = {
      render() {
        return h(Player, { playList, options })
      },
    }
    const app = createApp(App)
    app.use(VueSvgIconPlugin, {
      tagName: 'svg-icon',
    })
    app.component('Icon', Icon)
    window.vm = app.mount(this.options.container)
  }
}

export default DvaPlayer
