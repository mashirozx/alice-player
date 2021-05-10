export default (options) => {
  const finalOptions = {
    container: null,
    autoplay: null,
    preload: null,
    theme: null,
    mode: null,
    preload: null,
    volume: null,
    storageName: null,
  }
  // default options
  const defaultOption = {
    container: options.container || '#app',
    autoplay: false,
    preload: 'metadata',
    theme: '#333333',
    mode: 'list',
    preload: 'auto',
    volume: 0.7,
    storageName: 'player-setting',
  }
  for (const defaultKey in defaultOption) {
    if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
      finalOptions[defaultKey] = defaultOption[defaultKey]
    } else {
      finalOptions[defaultKey] = options[defaultKey]
    }
  }

  finalOptions['playList'] = options.playList.map((item) => {
    const res = {
      name: item.name || item.title || item.song || 'Audio name',
      artist: item.artist || item.author || item.singer || 'Audio artist',
      cover: item.cover || item.pic || item.thumb || thumbnail,
      thumbnail: item.thumb || thumbnail || item.cover || item.pic,
      audio: item.audio || item.src,
      lrc: item.lrc,
      theme: item.theme,
    }
    return res
  })

  return finalOptions
}
