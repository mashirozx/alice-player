<template>
  <Track
    :playList="state.playList"
    :currentIndex="state.currentPlayListIndex"
    :duration="duration"
    :durationReadable="durationReadable"
    :currentTime="currentTime"
    :currentTimeRatio="currentTimeRatio"
    :currentTimeReadable="currentTimeReadable"
    :isPlaying="isPlaying"
    :volume="volume"
    :playMode="playMode"
    @togglePlayPause="handleTogglePlayPauseEvent"
    @next="handleNextEvent"
    @prev="handlePrevEvent"
    @seek="handleSeekEvent"
    @changeVolume="handleChangeVolumeEvent"
    @toggleMute="handleToggleMuteEvent"
    @playTrack="handlePlayTrackEvent"
    @changePlayMode="handleChangePlayModeEvent"
  ></Track>
</template>

<script>
  import { reactive, computed } from 'vue'
  import Hash from 'object-hash'
  import utils from '@/utils'
  import store from '@/utils/store'
  import Track from './themes/Card.vue'

  const LRC_PENDING = [['00:00', 'Pending']]
  const LRC_LOADING = [['00:00', 'Loading']]
  const LRC_NONE = [['00:00', 'Not available']]

  export default {
    name: 'Player',
    components: { Track },
    props: {
      playList: {
        type: Array,
        required: true,
      },
      options: {
        type: Object,
        default() {
          return {
            preload: 'metadata', // 'none', 'auto'
            autoplay: true,
            imageProxy: '', // https://ip.webmasterapi.com/api/imageproxy/
          }
        },
      },
    },
    setup(props) {
      const state = reactive({
        history: {}, // [index: hash]
        order: [], // [hash] actual play order (play order use)
        playListHash: [], // [hash] in song list order (cache use)
        trackData: {}, // [hash: {audio, info}]
        currentIndex: 0, // index in [history]
        playList: computed(() => {
          return props.playList.map((item) => {
            const hash = Hash(item)
            let lrc
            if (state.trackData[hash]) {
              if (state.trackData[hash]['lrc']) {
                lrc = state.trackData[hash]['lrc']
              } else {
                lrc = LRC_PENDING
              }
            } else {
              lrc = LRC_PENDING
            }
            return {
              hash,
              audio: item.audio,
              thumbnail: props.options.imageProxy + item.thumbnail,
              title: item.title,
              singer: item.singer,
              lrc,
            }
          })
        }),
        currentPlayListIndex: computed(() => {
          return state.playListHash.indexOf(state.history[state.currentIndex])
        }),
      })
      return {
        state,
      }
    },
    data() {
      return {
        audio: null,
        duration: NaN,
        durationReadable: '00:00',
        progress: 0, // buffer status
        currentTime: NaN,
        currentTimeReadable: '00:00',
        currentTimeRatio: 0,
        isPlaying: false,
        isLoading: false,
        pendingPlay: false,
        canPlay: false,
        // TODO: nullish operator
        volume: Number(store.get('volume')) ? Number(store.get('volume')) : 0.5,
        eventRemovers: [],
        playMode: 0, // ['order', 'random', 'single']
      }
    },
    watch: {
      playList: {
        handler(list) {
          list.forEach((item) => {
            const hash = Hash(item)
            this.state.trackData[hash] = {
              audio: item.audio,
              info: {
                audio: item.audio,
                thumbnail: this.$props.options.imageProxy + item.thumbnail,
                title: item.title,
                singer: item.singer,
                lrc: item.lrc,
              },
              lrc: LRC_PENDING,
            }
            this.state.order.push(hash)
            this.state.playListHash.push(hash)
          })
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      resetPlayerState() {
        this.eventRemovers.forEach((remover) => remover())

        if (this.audio) {
          this.audio.removeAttribute('src')
          this.audio.load()
        }

        this.audio = null
        this.duration = NaN
        this.durationReadable = '00:00'
        this.progress = 0
        this.currentTime = NaN
        this.currentTimeReadable = '00:00'
        this.currentTimeRatio = 0
        this.isPlaying = false
        this.isLoading = false
        this.pendingPlay = false
        this.canPlay = false
        this.eventRemovers = []
      },
      async load(hash) {
        this.resetPlayerState()
        this.audio = new Audio(this.state.trackData[hash].info.audio)
        this.audio.preload = this.$props.options.preload
        this.audio.volume = this.volume

        this.loadLrc(hash, this.state.trackData[hash].info.lrc)

        this.customAddEventListener(this.audio, 'loadstart', this.handleLoadstartEvent)
        this.customAddEventListener(this.audio, 'progress', this.handleProgressEvent)
        this.customAddEventListener(this.audio, 'durationchange', this.handleDurationchangeEvent)
        this.customAddEventListener(this.audio, 'canplay', this.handleCanplayEvent)
        this.customAddEventListener(this.audio, 'canplaythrough', this.handleCanplaythroughEvent)
        this.customAddEventListener(this.audio, 'timeupdate', this.handleTimeupdateEvent)
        this.customAddEventListener(this.audio, 'ended', this.handleEndedEvent)
      },
      async loadLrc(hash, context) {
        this.state.trackData[hash]['lrc'] = LRC_LOADING
        let lrcRaw
        if (/^(http|https):\/\//.test(context)) {
          const url = context
          await new Promise((resolve) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
              lrcRaw = xhr.response
              resolve()
            }
            xhr.onerror = () => {
              console.warn(`** An error occurred during fetching ${url}`)
              lrcRaw = `[00:00.000]${LRC_NONE[0][1]}`
              resolve()
            }
            xhr.open('GET', url, true)
            xhr.responseType = 'text'
            xhr.send()
          })
        } else {
          lrcRaw = context
        }
        try {
          this.state.trackData[hash]['lrc'] = utils.parseLrc(lrcRaw)
        } catch (error) {
          console.warn(error)
          this.state.trackData[hash]['lrc'] = LRC_NONE
        }
      },
      playSpecifiedSong(hash) {
        this.state.history[this.state.currentIndex] = hash
        this.load(hash)
      },
      playUserSelectedSong(hash) {
        Object.keys(this.state.history).forEach((index) => {
          if (index > this.state.currentIndex) {
            delete this.state.history[index]
          }
        })
        this.state.currentIndex
        this.state.currentIndex += 1
        this.state.history[this.state.currentIndex] = hash
        this.load(hash)
      },
      next() {
        this.state.currentIndex += 1
        let hash
        if (this.state.history[this.state.currentIndex]) {
          // if there is history record for next song
          hash = this.state.history[this.state.currentIndex]
        } else {
          // if no record
          const lastTrackOrder = this.state.order.indexOf(
            this.state.history[this.state.currentIndex - 1]
          )
          if (lastTrackOrder + 1 < this.state.order.length) {
            hash = this.state.order[lastTrackOrder + 1]
          } else {
            hash = this.state.order[0]
          }
        }
        this.playSpecifiedSong(hash)
        this.pendingPlay = true
      },
      prev() {
        this.state.currentIndex -= 1
        let hash
        if (this.state.history[this.state.currentIndex]) {
          // if there is history record for prev song
          hash = this.state.history[this.state.currentIndex]
        } else {
          // if no record
          const lastTrackOrder = this.state.order.indexOf(
            this.state.history[this.state.currentIndex + 1]
          )
          if (lastTrackOrder - 1 > -1) {
            hash = this.state.order[lastTrackOrder - 1]
          } else {
            hash = this.state.order[this.state.order.length - 1]
          }
        }
        this.playSpecifiedSong(hash)
        this.pendingPlay = true
      },
      init() {
        const hash = this.state.order[this.state.currentIndex]
        this.playSpecifiedSong(hash)
      },
      handleLoadstartEvent(event) {
        this.isLoading = true
      },
      handleCanplayEvent(event) {
        this.canPlay = true
        if (this.pendingPlay) {
          this.play()
          this.pendingPlay = false
        }
      },
      handleCanplaythroughEvent(event) {
        this.audio.removeEventListener('progress', this.handleProgressEvent)
        this.progress = 1
        this.isLoading = false
      },
      handleProgressEvent(event) {
        // this.duration = this.audio.duration
        // this.durationReadable = utils.secondToTime(this.duration)
        this.progress = this.audio.buffered.length
          ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.duration
          : 0
      },
      handleDurationchangeEvent(event) {
        this.duration = this.audio.duration
        this.durationReadable = utils.secondToTime(this.duration)
      },
      handleTimeupdateEvent(event) {
        this.currentTime = this.audio.currentTime
        this.currentTimeReadable = utils.secondToTime(this.currentTime)
        this.currentTimeRatio = this.currentTime / this.duration
      },
      handleEndedEvent(event) {
        this.next()
      },
      handleTogglePlayPauseEvent() {
        if (!this.isPlaying) {
          this.play()
        } else {
          this.pause()
        }
      },
      handleSeekEvent(time) {
        if (!this.canPlay) return
        this.seek(time)
      },
      handleChangeVolumeEvent(target) {
        this.setVolume(target)
      },
      handleNextEvent() {
        this.next()
      },
      handlePrevEvent() {
        this.prev()
      },
      handleToggleMuteEvent() {
        if (this.volume > 0) {
          store.set('volume_mute_save', this.volume)
          this.setVolume(0)
        } else {
          const saved = store.get('volume_mute_save')
          if (saved) {
            this.setVolume(saved)
          } else {
            this.setVolume(0.5)
          }
        }
      },
      handlePlayTrackEvent(index) {
        const hash = this.state.playListHash[index]
        this.playUserSelectedSong(hash)
        this.pendingPlay = true
      },
      handleChangePlayModeEvent() {
        this.playMode = this.playMode < 2 ? this.playMode + 1 : 0
        if (this.playMode === 0) {
          this.state.order = this.state.playListHash
        } else if (this.playMode === 1) {
          this.state.order = utils.shuffleArray(this.state.playListHash)
        } else if (this.playMode === 2) {
          this.state.order = [this.state.playListHash[this.state.currentPlayListIndex]]
        }
      },
      seek(time) {
        let _time = time
        _time = Math.max(time, 0)
        _time = Math.min(time, this.duration)
        this.audio.currentTime = _time
      },
      setVolume(ratio) {
        let _ratio = ratio
        _ratio = Math.max(ratio, 0)
        _ratio = Math.min(ratio, 1)
        this.volume = _ratio
        store.set('volume', _ratio)
        this.audio.volume = this.volume
      },
      async play() {
        if (!this.audio) {
          this.init()
        }
        if (!this.canPlay) {
          this.pendingPlay = true
        } else {
          this.isPlaying = true
          await this.audio.play()
        }
      },
      async pause() {
        this.isPlaying = false
        await this.audio.pause()
      },
      /**
       * @param {HTMLAudioElement} element
       * @param {String} event
       * @param {Function} handler
       * @return {Void}
       */
      customAddEventListener(element, event, handler) {
        element.addEventListener(event, handler)
        this.eventRemovers.push(() => element.removeEventListener('loadstart', handler))
      },
    },
    mounted() {
      this.init()
    },
  }
</script>
