import AlicePlayer from './index'

var options = {
  preload: 'metadata',
  autoplay: false,
}

var playList = [
  {
    audio:
      'https://s3-hk.2heng.xin/mstdn/static/alice-player/僕らの手には何もないけど、 - RAM WIRE.mp3',
    cover:
      'https://s3-hk.2heng.xin/mstdn/static/alice-player/僕らの手には何もないけど、 - RAM WIRE.jpg',
    lrc:
      'https://s3-hk.2heng.xin/mstdn/static/alice-player/僕らの手には何もないけど、 - RAM WIRE.lrc',
    name: '僕らの手には何もないけど、',
    artist: 'RAM WIRE',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/光るなら - Goose house.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/光るなら - Goose house.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/光るなら - Goose house.lrc',
    name: '光るなら',
    artist: 'Goose house',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/前前前世 - RADWIMPS.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/前前前世 - RADWIMPS.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/前前前世 - RADWIMPS.lrc',
    name: '前前前世',
    artist: 'RADWIMPS',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/Brave Song - 多田葵.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/Brave Song - 多田葵.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/Brave Song - 多田葵.lrc',
    name: 'Brave Song',
    artist: '多田葵',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/トリカゴ - XX:me.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/トリカゴ - XX:me.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/トリカゴ - XX:me.lrc',
    name: 'トリカゴ',
    artist: 'XX:me',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/A Tender Feeling - 梶浦由記.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/A Tender Feeling - 梶浦由記.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/A Tender Feeling - 梶浦由記.lrc',
    name: 'A Tender Feeling',
    artist: '梶浦由記',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/Heartbeats - Amy Deasismont.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/Heartbeats - Amy Deasismont.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/Heartbeats - Amy Deasismont.lrc',
    name: 'Heartbeats',
    artist: 'Amy Deasismont',
  },
  {
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/春夏秋冬 - 张国荣.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/春夏秋冬 - 张国荣.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/春夏秋冬 - 张国荣.lrc',
    name: '春夏秋冬',
    artist: '张国荣',
  },
]

var ap = new AlicePlayer(playList, options)
