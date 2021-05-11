import DvaPlayer from './index'

var options = {
  preload: 'metadata',
  autoplay: false,
}

var playList = [
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/僕らの手には何もないけど、 - RAM WIRE.mp3',
    thumbnail:
      'https://ngx.moezx.cc/share/SamoyedPlayer/僕らの手には何もないけど、 - RAM WIRE.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/僕らの手には何もないけど、 - RAM WIRE.lrc',
    title: '僕らの手には何もないけど、',
    artist: 'RAM WIRE',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/hikarunara.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/hikarunara.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/hikarunara.lrc',
    title: '光るなら',
    artist: 'Goose house',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/yourname.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/yourname.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/yourname.lrc',
    title: '前前前世',
    artist: 'RADWIMPS',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/Brave Song - 多田葵.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/Brave Song - 多田葵.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/Brave Song - 多田葵.lrc',
    title: 'Brave Song',
    artist: '多田葵',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/darling.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/darling.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/darling.lrc',
    title: 'トリカゴ',
    artist: 'XX:me',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/A Tender Feeling - 梶浦由記.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/A Tender Feeling - 梶浦由記.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/A Tender Feeling - 梶浦由記.lrc',
    title: 'A Tender Feeling',
    artist: '梶浦由記',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/Heartbeats - Amy Deasismont.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/Heartbeats - Amy Deasismont.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/Heartbeats - Amy Deasismont.lrc',
    title: 'Heartbeats',
    artist: 'Amy Deasismont',
  },
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/春夏秋冬 - 张国荣.mp3',
    thumbnail: 'https://ngx.moezx.cc/share/SamoyedPlayer/春夏秋冬 - 张国荣.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/春夏秋冬 - 张国荣.lrc',
    title: '春夏秋冬',
    artist: '张国荣',
  },
]

var dv = new DvaPlayer(playList, options)
