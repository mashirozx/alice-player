<template>
  <div :class="['player']" :style="cssVars">
    <div class="cover">
      <img
        class="image"
        :src="currentTrack.cover"
        alt="cover"
        draggable="false"
        loading="lazy"
        @error="setAltImg"
      />
    </div>
    <div :class="['info', display === 'thumb' ? 'thumb' : 'popup']">
      <div class="progress">
        <div class="time current">{{ $props.currentTimeReadable }}</div>
        <div class="bar__wrapper">
          <div
            class="bar__toucharea"
            ref="progress"
            @click="handleClickProgressBarEvent($event, 'progress')"
          >
            <div class="bar">
              <div
                class="fill"
                :style="{
                  width: `calc(${100 * $props.currentTimeRatio}% + ${
                    $props.currentTimeRatio > 0 ? 6 : 0
                  }px)`,
                }"
              ></div>
            </div>
          </div>
        </div>
        <div class="time total">{{ $props.durationReadable }}</div>
      </div>
      <div class="meta">
        <div class="name song">{{ currentTrack.name }}</div>
        <div class="name artist">{{ currentTrack.artist }}</div>
      </div>
      <div class="controls">
        <div v-for="(button, index) in buttons" :key="index" :class="['button', ...button.classes]">
          <div class="volume-control">
            <div
              v-if="button.volume"
              class="toucharea"
              ref="volume"
              @click="handleClickVolumeBarEvent"
            >
              <div class="bar">
                <div
                  class="fill"
                  :style="{
                    height: `calc(${100 * $props.volume}% + ${$props.volume > 0 ? 6 : 0}px)`,
                  }"
                ></div>
              </div>
            </div>
          </div>
          <icon :name="button.icon" @click="handleButtonClickEvent(button)"></icon>
        </div>
      </div>
      <div :class="['popup']">
        <div class="wrapper">
          <div class="track-item float">
            <div class="thumb">
              <img
                class="image"
                :src="currentTrack.cover"
                alt="thumb"
                loading="lazy"
                @error="setAltImg"
              />
            </div>
            <div class="info">
              <div class="name">{{ currentTrack.name }}</div>
              <div class="artist">{{ currentTrack.artist }}</div>
              <div class="progress">
                <div class="time">
                  <div class="text">{{ $props.currentTimeReadable }}</div>
                  <div class="text">{{ $props.durationReadable }}</div>
                </div>
                <div
                  class="toucharea"
                  ref="progressMini"
                  @click="handleClickProgressBarEvent($event, 'progressMini')"
                >
                  <div class="bar">
                    <div
                      class="fill"
                      :style="{
                        width: `calc(${100 * $props.currentTimeRatio}% + ${
                          $props.currentTimeRatio > 0 ? 6 : 0
                        }px)`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="['list', display === 'list' ? 'display' : 'hide']">
            <div
              v-for="(track, index) in $props.playList"
              :key="index"
              :class="[
                'track-item',
                index === $props.currentIndex ? 'current' : '',
                index === $props.currentIndex - 1 ? 'last-counterpart' : '',
              ]"
              @click="handlePlaySpecifiedTrackEvent(index)"
            >
              <div class="thumb">
                <img
                  class="image"
                  :src="track.cover"
                  alt="thumb"
                  loading="lazy"
                  @error="setAltImg"
                />
              </div>
              <div class="info">
                <div class="name">{{ track.name }}</div>
                <div class="artist">{{ track.artist }}</div>
              </div>
            </div>
          </div>
          <div :class="['lrc', display === 'lrc' ? 'display' : 'hide']">
            <Lrc
              :lrc="currentTrack.lrc"
              :currentTime="$props.currentTime"
              @seek="handleSeekEvent"
            ></Lrc>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ColorThief from '@moezx/colorthief'
  import chroma from 'chroma-js'
  import utils from '@/utils'
  import { DEFAULT_COVER } from '@/utils/constants'
  import Lrc from '../Lrc.vue'
  export default {
    name: 'Track',
    components: { Lrc },
    props: {
      duration: { type: Number, default: 0 },
      durationReadable: { type: String, default: '00:00' },
      currentTimeReadable: { type: String, default: '00:00' },
      currentTimeRatio: { type: Number, default: 0 },
      currentTime: { type: Number, default: 0 },
      isPlaying: { type: Boolean, default: false },
      volume: { type: Number, default: 1 },
      currentIndex: { type: Number, default: 0 },
      playMode: { type: Number, default: 0 },
      playList: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        primaryColor: '#333333',
        secondaryColor: '#5c5c5c',
        lightColor: '#a1a1a1',
        darkColor: '#0c0c0c',
        isMobile: false,
        display: 'thumb', // thumb, list, lrc
      }
    },
    computed: {
      buttons() {
        const volumeIcon = () => {
          if (this.$props.volume === 0 || !this.$props.volume) {
            return 'volume-mute'
          } else if (this.$props.volume < 0.33) {
            return 'volume-down'
          } else if (this.$props.volume < 0.66) {
            return 'volume'
          } else {
            return 'volume-up'
          }
        }

        const modeIcon = () => {
          if (this.$props.playMode === 0) {
            return 'repeat'
          } else if (this.$props.playMode === 1) {
            return 'random'
          } else if (this.$props.playMode === 2) {
            return 'repeat-1'
          }
        }

        return [
          {
            classes: ['list'],
            icon: this.display === 'list' ? 'times' : 'bars',
            event: () => {
              if (this.display === 'list') {
                this.display = 'thumb'
              } else {
                this.display = 'list'
              }
            },
          },
          {
            classes: ['shuffle'],
            icon: modeIcon(),
            event: () => this.$emit('changePlayMode'),
          },
          {
            classes: ['previous'],
            icon: 'backward',
            event: () => this.$emit('prev'),
          },
          {
            classes: [this.$props.isPlaying ? 'pause' : 'play'],
            icon: this.$props.isPlaying ? 'pause' : 'play',
            event: () => this.$emit('togglePlayPause'),
          },
          {
            classes: ['next'],
            icon: 'forward',
            event: () => this.$emit('next'),
          },
          {
            volume: true,
            classes: ['volume'],
            icon: volumeIcon(),
            event: () => this.$emit('toggleMute'),
          },
          {
            classes: ['lrc'],
            icon: this.display === 'lrc' ? 'times' : 'scroll-old',
            event: () => {
              if (this.display === 'lrc') {
                this.display = 'thumb'
              } else {
                this.display = 'lrc'
              }
            },
          },
        ]
      },
      cssVars() {
        return {
          '--primary': this.primaryColor,
          '--secondary': this.secondaryColor,
          '--light': this.lightColor,
          '--dark': this.darkColor,
          '--dark-lighten-15': chroma(this.darkColor).brighten(1.5),
          '--light-alpha-1': chroma(this.lightColor).alpha(0.1),
          '--light-alpha-4': chroma(this.lightColor).alpha(0.4),
          '--primary-lighten-20': chroma(this.secondaryColor).brighten(2),
          '--secondary-lighten-20': chroma(this.secondaryColor).brighten(2),
          '--secondary-darken-10': chroma(this.secondaryColor).darken(1),
        }
      },
      currentTrack() {
        const current = this.$props.playList[this.$props.currentIndex]
        if (current) {
          return current
        } else {
          // defalut image
          return {
            cover: DEFAULT_COVER,
            name: 'Track Loading',
            artist: '',
            lrc: [['00:00', 'Loading']],
            color: '#333333',
          }
        }
      },
    },
    watch: {
      currentTrack: {
        handler() {
          this.colorThief(this.currentTrack.cover, this.currentTrack.color)
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      setAltImg(event) {
        event.target.src = DEFAULT_COVER
        this.colorThief(DEFAULT_COVER, null)
        // event.target.style.background = this.currentTrack.color || '#999999'
      },
      handleSeekEvent(time) {
        this.$emit('seek', time)
      },
      handlePlaySpecifiedTrackEvent(index) {
        if (index === this.$props.currentIndex) {
          this.$emit('togglePlayPause')
        } else {
          this.$emit('playTrack', index)
        }
      },
      handleClickCloseListEvent() {
        this.displayList = !this.displayList
      },
      handleClickProgressBarEvent(event, ref) {
        const rect = this.$refs[ref].getBoundingClientRect()
        const offset = event.pageX - rect.x
        const width = rect.right - rect.left
        const target = offset / width
        const time = target * this.$props.duration
        this.$emit('seek', time)
      },
      handleClickVolumeBarEvent(event) {
        const rect = this.$refs.volume.getBoundingClientRect()
        const height = rect.bottom - rect.top
        const offset = event.pageY - rect.y
        let target
        if (this.display === 'thumb') {
          target = 1 - offset / height
        } else {
          target = offset / height
        }
        this.$emit('changeVolume', target)
      },
      handleButtonClickEvent(button) {
        if (button.event) {
          button.event()
        }
      },
      async colorThief(_cover, _color) {
        const cover = _cover
        let color
        if (_color) {
          color = _color
        } else {
          const image = new Image()
          image.crossOrigin = 'anonymous'
          image.src = cover
          await new Promise((resolve) => {
            image.addEventListener('load', async (event) => {
              const colorThief = new ColorThief()

              try {
                color = chroma(...(await colorThief.getColor(image))).hex()
              } catch (e) {
                color = '#333333'
              }
              const contrast = chroma.contrast(chroma(color).hex(), '#ffffff')
              if (contrast < 4) {
                color = chroma(color).darken(3).hex()
              }
              resolve()
            })
          })
        }
        this.primaryColor = chroma(color).hex()
        this.secondaryColor = chroma(color).brighten().hex()
        this.darkColor = chroma(color).darken().hex()
        this.lightColor = chroma(color).brighten(2.5).hex()
      },
    },
    mounted() {
      this.isMobile = utils.isMobile
    },
  }
</script>

<style lang="scss" scoped>
  $white: #ffffff;
  $shadow-gray: #f1f1f1;
  $light: var(--light);
  $secondary: var(--secondary);
  $primary: var(--primary);
  $dark: var(--dark);

  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&family=Questrial&display=swap');
  $font: 'Questrial', 'Noto Sans SC', sans-serif;

  .player {
    background: $white;
    position: relative;
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 5px 5px 15px var(--light-alpha-4);
    > .cover {
      width: 100%;
      height: 100%;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    > .info {
      width: 100%;
      position: absolute;
      bottom: 0;
      background: rgba($white, 0.85);
      transition: all 0.5s ease-in-out;
      .progress {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .time {
          width: 15%;
          font-family: $font;
          color: $dark;
          font-size: 10px;
          &.current {
            text-align: left;
            padding-left: 10px;
          }
          &.total {
            text-align: right;
            padding-right: 10px;
          }
        }
        .bar__wrapper {
          height: 35px;
          width: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
          .bar__toucharea {
            height: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .bar {
              height: 6px;
              width: 100%;
              background: $light;
              border-radius: 3px;
              .fill {
                background-color: $secondary;
                width: 0%;
                height: 100%;
                border-radius: 3px;
              }
            }
          }
        }
      }
      .meta {
        text-align: center;
        margin-top: -3px;
        .name {
          font-family: $font;
          text-transform: uppercase;
          margin: 0;
          &.song {
            font-size: 0.8em;
            letter-spacing: 3px;
            color: $dark;
          }
          &.artist {
            font-size: 0.6em;
            letter-spacing: 1.5px;
            color: var(--dark-lighten-15);
            margin-top: 5px;
          }
        }
      }
      .controls {
        height: 45px;
        font-size: 0.8em;
        color: $secondary;
        display: flex;
        align-items: center;
        justify-content: center;
        .button {
          transition: all 0.5s ease;
          cursor: pointer;
          &:hover {
            color: var(--dark-lighten-15);
          }
          &.play,
          &.pause {
            margin: 15px 25px;
            color: var(--secondary-darken-10);
          }
          &.list {
            left: 10px;
            position: absolute;
            font-size: 0.8em;
          }
          &.lrc {
            right: 10px;
            position: absolute;
            font-size: 0.8em;
          }
          &.shuffle {
            margin-right: 30px;
            font-size: 0.8em;
          }
          &.volume {
            margin-left: 30px;
            font-size: 0.8em;
            $bar-height: 36px;
            .volume-control {
              position: absolute;
              width: 20px;
              height: $bar-height + 5px;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              transform: translate(-7px, -42px);
              pointer-events: none;
              .toucharea {
                width: 100%;
                height: $bar-height;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                overflow: hidden;
                transition: all 0.5s ease;
                .bar {
                  height: 100%;
                  width: 6px;
                  background: $light;
                  border-radius: 3px;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  transform: scaleY(0);
                  transform-origin: bottom;
                  transition: all 0.5s ease;
                  .fill {
                    background-color: $secondary;
                    width: 100%;
                    height: 0%;
                    border-radius: 3px;
                  }
                }
              }
            }
            &:hover {
              .volume-control {
                pointer-events: auto;
                .toucharea {
                  .bar {
                    transform: scaleY(1);
                  }
                }
              }
            }
          }
        }
      }
      .popup {
        width: 100%;
        height: calc(300px - 45px);
        .wrapper {
          height: 100%;
          .list {
            position: absolute;
            bottom: 0;
            overflow-y: auto;
            width: 100%;
            height: 180px;
            transform-origin: bottom;
            transition: all 0.5s ease-in-out;
            &.display {
              // left: 0;
              opacity: 1;
              pointer-events: auto;
            }
            &.hide {
              // left: -100%;
              opacity: 0;
              pointer-events: none;
            }
          }
          .lrc {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 180px;
            transform-origin: bottom;
            transition: all 0.3s ease-in-out;
            &.display {
              // left: 0;
              opacity: 1;
              pointer-events: auto;
            }
            &.hide {
              // left: 100%;
              opacity: 0;
              pointer-events: none;
            }
          }
          .track-item {
            width: 100%;
            height: 60px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            transition: all 0.5s ease-in-out;
            cursor: pointer;
            .thumb {
              flex: 0 0 auto;
              width: 60px;
              height: 60px;
              display: flex;
              justify-content: center;
              align-items: center;
              .image {
                width: 45px;
                height: 45px;
                border-radius: 5px;
              }
            }
            .info {
              flex: 1 1 auto;
              width: 100%;
              height: 100%;
              display: flex;
              flex-flow: column nowrap;
              justify-content: center;
              align-items: flex-start;
              font-family: $font;
              box-sizing: border-box;
              border-bottom: 2px $shadow-gray solid;
              // padding-bottom: 1px;
              .name {
                font-size: 0.8em;
                font-weight: 500;
                letter-spacing: 3px;
                color: $dark;
              }
              .artist {
                font-size: 0.6em;
                font-weight: 400;
                letter-spacing: 1.5px;
                color: var(--dark-lighten-15);
                margin-top: 5px;
              }
            }
            &.float {
              height: 75px;
              box-sizing: border-box;
              border-top: 2px $shadow-gray solid;
              border-bottom: 3px $shadow-gray solid;
              cursor: auto;
              .thumb {
                width: 75px;
                height: 75px;
                .image {
                  width: 55px;
                  height: 55px;
                }
              }
              .info {
                height: 100%;
                justify-content: flex-end;
                border-bottom: none;
                // .name {
                // }
                .artist {
                  margin-top: 4px;
                  padding-bottom: 4px;
                }
                .progress {
                  width: 100%;
                  height: 28px;
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: flex-start;
                  .time {
                    height: 10px;
                    width: calc(100% - 10px);
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    .text {
                      line-height: 10px;
                      font-family: $font;
                      color: $dark;
                    }
                  }
                  .toucharea {
                    width: calc(100% - 10px);
                    height: 18px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    cursor: pointer;
                    .bar {
                      height: 6px;
                      width: 100%;
                      background: $light;
                      border-radius: 3px;
                      margin-top: 2px;
                      .fill {
                        background-color: $secondary;
                        width: 0%;
                        height: 100%;
                        border-radius: 3px;
                      }
                    }
                  }
                }
              }
            }
            &.current {
              background: $shadow-gray;
            }
            &.last-counterpart {
              .info {
                border-bottom: 2px $white solid;
              }
            }
          }
        }
      }
      // controls display
      &.thumb {
        transform: translateY(calc(300px - 45px));
      }
      &.popup {
        background: rgba($white, 1);
        transform: translateY(0);
        .controls {
          .button {
            &.volume {
              .volume-control {
                transform: translate(-7px, 14px);
                justify-content: flex-end;
                .toucharea {
                  justify-content: flex-start;
                  .bar {
                    transform-origin: top;
                    justify-content: flex-start;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .image {
    object-fit: cover;
    object-position: center center;
  }

  $ui-base-color: var(--primary-lighten-20);
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--secondary);
    border: 0px none var(--primary);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary);
  }

  ::-webkit-scrollbar-thumb:active {
    background: var(--secondary);
  }

  ::-webkit-scrollbar-track {
    border: 0px none var(--primary-lighten-20);
    border-radius: 0;
    background: var(--light-alpha-1);
  }

  ::-webkit-scrollbar-track:hover {
    background: $ui-base-color;
  }

  ::-webkit-scrollbar-track:active {
    background: $ui-base-color;
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>
