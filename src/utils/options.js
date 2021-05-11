export default (playList, options) => {
  // default options
  const defaultOption = {
    container: options.container || '#app',
    autoplay: false,
    preload: 'metadata',
    color: '#333333',
    playMode: 'order',
    volume: 0.7,
    storageName: 'player-setting',
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
      title: item.name || item.title || item.song || 'Audio name',
      singer: item.artist || item.author || item.singer || 'Audio artist',
      cover: item.cover || item.pic || item.thumb || item.thumbnail,
      thumbnail: item.thumb || item.thumbnail || item.cover || item.pic,
      audio: item.audio || item.src,
      lrc: item.lrc,
      color: item.color,
    }
    return res
  })

  return { playList, options: defaultOption }
}
