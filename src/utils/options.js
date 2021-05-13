import { DEFAULT_COVER } from '@/utils/constants'
export default (playList, options) => {
  // default options
  const defaultOption = {
    container: options.container || '#app',
    autoplay: false,
    preload: 'metadata',
    color: null,
    playMode: 'order',
    volume: 0.7,
    storageName: 'alice-player-setting',
  }
  for (const defaultKey in defaultOption) {
    if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
      defaultOption[defaultKey] = defaultOption[defaultKey]
    } else {
      defaultOption[defaultKey] = options[defaultKey]
    }
  }

  playList = playList || options.playList

  playList = playList.map((item) => {
    const res = {
      name: item.name || item.title || item.song || 'Audio name',
      artist: item.artist || item.author || item.singer || 'Audio artist',
      cover: item.cover || item.pic || item.thumb || item.thumbnail || DEFAULT_COVER,
      thumbnail: item.thumb || item.thumbnail || item.cover || item.pic || DEFAULT_COVER,
      audio: item.audio || item.src,
      lrc: item.lrc,
      color: item.color || options.color || null,
    }
    return res
  })

  return { playList, options: defaultOption }
}
