# AlicePlayer

> A beautiful H5 music player built with Vue3. 🍉

## Preview

| The cover | The play list | The lyrics |
| :-: | :-: | :-: |
| ![](https://s3-hk.2heng.xin/mstdn/media_attachments/files/106/221/762/069/086/405/original/4279a568c47a6c9e.png) | ![](https://s3-hk.2heng.xin/mstdn/media_attachments/files/106/221/763/122/105/741/original/61f4e01d263edb15.png) | ![](https://s3-hk.2heng.xin/mstdn/media_attachments/files/106/221/764/660/792/844/original/f3836219b5a4f296.png) |

Demo [here](https://player.2heng.xin/)

## Install

Using npm:

```bash
npm install alice-player --save
```

Using Yarn:

```bash
yarn add alice-player
```

## Quick Start

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alice-player@latest/dist/style.css" />
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/alice-player@latest/dist/alice-player.umd.js"></script>
```

```js
var playList = [
  {
    audio: 'https://ngx.moezx.cc/share/SamoyedPlayer/僕らの手には何もないけど、 - RAM WIRE.mp3',
    cover: 'https://ngx.moezx.cc/share/SamoyedPlayer/僕らの手には何もないけど、 - RAM WIRE.jpg',
    lrc: 'https://ngx.moezx.cc/share/SamoyedPlayer/僕らの手には何もないけど、 - RAM WIRE.lrc',
    name: '僕らの手には何もないけど、',
    artist: 'RAM WIRE',
  },
]

var options = {
  container: '#app',
  preload: 'metadata',
}

var ap = new AlicePlayer(playList, options)
```

## Options

| Key | Type | Default | Description |
| :-: | :-: | :-: | :-- |
| container | String | `'#app'` | Where we render the player on HTML |
| autoplay | Boolean | `false` | Auto play audio |
| preload | String | 'metadata' | [HTMLMediaElement.preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload) |
| color | String | `null` | The default theme color, can also be set in track info object in `playList`, which will overwrite the global color setting |
| playMode | String | `'order'` | Value can be one of `order`, `random`, and `single` |
| volume | Number | 0.7 | The default volume, range from 0 to 1 |
| storageName | String | 'alice-player-setting' | The key prefix where we save values in cookie |

_Note: This plugin is still under heavily development, some options doesn't really work now._
