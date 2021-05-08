const isMobile = /mobile/i.test(window.navigator.userAgent)

const utils = {
  /**
   * @param {string} path
   * @returns {Boolean}
   */
  isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  },

  /**
   * Parse second to time string
   *
   * @param {Number} second
   * @return {String} 00:00 or 00:00:00
   */
  secondToTime: (second) => {
    const add0 = (num) => (num < 10 ? '0' + num : '' + num)
    const hour = Math.floor(second / 3600)
    const min = Math.floor((second - hour * 3600) / 60)
    const sec = Math.floor(second - hour * 3600 - min * 60)
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
  },

  isMobile,

  storage: {
    set: (key, value) => {
      localStorage.setItem(key, value)
    },

    get: (key) => localStorage.getItem(key),
  },

  nameMap: {
    dragStart: isMobile ? 'touchstart' : 'mousedown',
    dragMove: isMobile ? 'touchmove' : 'mousemove',
    dragEnd: isMobile ? 'touchend' : 'mouseup',
  },

  /**
   * get random order, using Fisher–Yates shuffle
   */
  randomOrder: (length) => {
    function shuffle(arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const itemAtIndex = arr[randomIndex]
        arr[randomIndex] = arr[i]
        arr[i] = itemAtIndex
      }
      return arr
    }
    return shuffle(
      [...Array(length)].map(function (item, i) {
        return i
      })
    )
  },

  /**
   * Parse lrc, suppose multiple time tag
   *
   * @param {String} lrc_s - Format:
   * [mm:ss]lyric
   * [mm:ss.xx]lyric
   * [mm:ss.xxx]lyric
   * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
   * [mm:ss.xx]<mm:ss.xx>lyric
   *
   * @return {Array} [[time, text], [time, text], [time, text], ...]
   */
  parseLrc(lrc_s) {
    if (lrc_s) {
      lrc_s = lrc_s.replace(/([^\]^\n])\[/g, (match, p1) => p1 + '\n[')
      const lyric = lrc_s.split('\n')
      let lrc = []
      const lyricLen = lyric.length
      for (let i = 0; i < lyricLen; i++) {
        // match lrc time
        const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g)
        // match lrc text
        const lrcText = lyric[i]
          .replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, '')
          .replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, '')
          .replace(/^\s+|\s+$/g, '')

        if (lrcTimes) {
          // handle multiple time tag
          const timeLen = lrcTimes.length
          for (let j = 0; j < timeLen; j++) {
            const oneTime = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(lrcTimes[j])
            const min2sec = oneTime[1] * 60
            const sec2sec = parseInt(oneTime[2])
            const msec2sec = oneTime[4]
              ? parseInt(oneTime[4]) / ((oneTime[4] + '').length === 2 ? 100 : 1000)
              : 0
            const lrcTime = min2sec + sec2sec + msec2sec
            lrc.push([lrcTime, lrcText])
          }
        }
      }
      // sort by time
      lrc = lrc.filter((item) => item[1])
      lrc.sort((a, b) => a[0] - b[0])
      return lrc
    } else {
      return []
    }
  },
}

export default utils
