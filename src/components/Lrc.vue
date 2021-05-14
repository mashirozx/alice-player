<template>
  <div class="lrc__container" :ref="setContainerRef" :data="state.offsetTop">
    <div
      v-for="(line, index) in $props.lrc"
      :key="index"
      :class="['lrc', state.timeSeries[line[0]]]"
      :ref="setRowRefs($el, index)"
      @click="handleSeekClick(line[0])"
    >
      <span class="content">
        {{ state.parsedLrc[index].content }}
      </span>
      <em class="translation" v-if="state.parsedLrc[index].translation">
        {{ state.parsedLrc[index].translation }}
      </em>
    </div>
  </div>
</template>

<script>
  import { reactive, computed } from 'vue'
  export default {
    props: {
      lrc: {
        type: Array,
        default() {
          return [['00:00', 'Not available']]
        },
      },
      currentTime: { type: Number, default: NaN },
    },
    setup(props) {
      const state = reactive({
        currentIndex: NaN,
        containerRef: null,
        rowRefs: [],
        // {time: state}
        timeSeries: computed(() => {
          const current = props.currentTime
          const series = {}

          props.lrc.forEach((item, index) => {
            const thisTime = item[0]
            if (index === props.lrc.length - 1) {
              if (thisTime <= current) {
                series[thisTime] = 'now'
                state.currentIndex = index
              } else {
                series[thisTime] = 'new'
              }
              return series
            }
            const nextItem = props.lrc[index + 1]
            const nextTime = nextItem ? nextItem[0] : undefined
            if (thisTime < current && nextTime <= current) {
              series[thisTime] = 'old'
            } else if (thisTime <= current && nextTime > current) {
              series[thisTime] = 'now'
              state.currentIndex = index
            } else {
              series[thisTime] = 'new'
            }
          })

          return series
        }),
        offsetTop: computed(() => {
          let offset
          if (!state.currentIndex) {
            offset = 0
          } else if (state.currentIndex >= 0) {
            if (state.rowRefs[state.currentIndex]) {
              offset = state.rowRefs[state.currentIndex].offsetTop
            } else {
              offset = 0
            }
          } else {
            offset = 0
          }
          const container = state.containerRef
          if (container) container.scrollTop = offset
          return offset
        }),
        parsedLrc: computed(() => {
          let lrc = []
          lrc = props.lrc.map((item, index) => {
            const lrcText = item[1]
            const regex = /^(.*?)(?:\s\((.*)\))?$/
            const match = lrcText.match(regex)
            return {
              content: match[1],
              translation: match[2],
            }
          })
          return lrc
        }),
      })

      return {
        state,
      }
    },
    methods: {
      setRowRefs(el, index) {
        if (el) {
          this.state.rowRefs[index] = el.children[index]
        }
      },
      setContainerRef(el) {
        if (el) {
          this.state.containerRef = el
        }
      },
      handleSeekClick(time) {
        this.$emit('seek', time)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .lrc__container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
    // scroll-snap-type: y mandatory;
    .lrc {
      line-height: 16px;
      font-size: 12px;
      padding: 5px 10px;
      text-align: center;
      white-space: pre-line;
      .content {
        display: block;
      }
      .translation {
        display: block;
      }
      &.old,
      &.new {
        color: #999999;
      }
      &.now {
        background: #f1f1f1;
        // scroll-snap-align: center;
      }
    }
  }
</style>
