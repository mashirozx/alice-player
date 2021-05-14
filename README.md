# AlicePlayer

> A beautiful H5 music player built with Vue3. 🍉

**This project is under heavy development, APIs might be changed in the feature.**

![npm](https://img.shields.io/npm/v/alice-player?color=%23CC3534&logo=npm) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/mashirozx/alice-player/vue?color=%2342b983&logo=vue.js) ![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/mashirozx/alice-player/dev/vite?color=%23646cff&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iNDEwIiBoZWlnaHQ9IjQwNCIgdmlld0JveD0iMCAwIDQxMCA0MDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BCjxwYXRoIGQ9Ik0zOTkuNjQxIDU5LjUyNDZMMjE1LjY0MyAzODguNTQ1QzIxMS44NDQgMzk1LjMzOCAyMDIuMDg0IDM5NS4zNzggMTk4LjIyOCAzODguNjE4TDEwLjU4MTcgNTkuNTU2M0M2LjM4MDg3IDUyLjE4OTYgMTIuNjgwMiA0My4yNjY1IDIxLjAyODEgNDQuNzU4NkwyMDUuMjIzIDc3LjY4MjRDMjA2LjM5OCA3Ny44OTI0IDIwNy42MDEgNzcuODkwNCAyMDguNzc2IDc3LjY3NjNMMzg5LjExOSA0NC44MDU4QzM5Ny40MzkgNDMuMjg5NCA0MDMuNzY4IDUyLjE0MzQgMzk5LjY0MSA1OS41MjQ2WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgo8cGF0aCBkPSJNMjkyLjk2NSAxLjU3NDRMMTU2LjgwMSAyOC4yNTUyQzE1NC41NjMgMjguNjkzNyAxNTIuOTA2IDMwLjU5MDMgMTUyLjc3MSAzMi44NjY0TDE0NC4zOTUgMTc0LjMzQzE0NC4xOTggMTc3LjY2MiAxNDcuMjU4IDE4MC4yNDggMTUwLjUxIDE3OS40OThMMTg4LjQyIDE3MC43NDlDMTkxLjk2NyAxNjkuOTMxIDE5NS4xNzIgMTczLjA1NSAxOTQuNDQzIDE3Ni42MjJMMTgzLjE4IDIzMS43NzVDMTgyLjQyMiAyMzUuNDg3IDE4NS45MDcgMjM4LjY2MSAxODkuNTMyIDIzNy41NkwyMTIuOTQ3IDIzMC40NDZDMjE2LjU3NyAyMjkuMzQ0IDIyMC4wNjUgMjMyLjUyNyAyMTkuMjk3IDIzNi4yNDJMMjAxLjM5OCAzMjIuODc1QzIwMC4yNzggMzI4LjI5NCAyMDcuNDg2IDMzMS4yNDkgMjEwLjQ5MiAzMjYuNjAzTDIxMi41IDMyMy41TDMyMy40NTQgMTAyLjA3MkMzMjUuMzEyIDk4LjM2NDUgMzIyLjEwOCA5NC4xMzcgMzE4LjAzNiA5NC45MjI4TDI3OS4wMTQgMTAyLjQ1NEMyNzUuMzQ3IDEwMy4xNjEgMjcyLjIyNyA5OS43NDYgMjczLjI2MiA5Ni4xNTgzTDI5OC43MzEgNy44NjY4OUMyOTkuNzY3IDQuMjczMTQgMjk2LjYzNiAwLjg1NTE4MSAyOTIuOTY1IDEuNTc0NFoiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcikiLz4KPGRlZnM%2BCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjYuMDAwMTciIHkxPSIzMi45OTk5IiB4Mj0iMjM1IiB5Mj0iMzQ0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI%2BCjxzdG9wIHN0b3AtY29sb3I9IiM0MUQxRkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQkQzNEZFIi8%2BCjwvbGluZWFyR3JhZGllbnQ%2BCjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhciIgeDE9IjE5NC42NTEiIHkxPSI4LjgxODE4IiB4Mj0iMjM2LjA3NiIgeTI9IjI5Mi45ODkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGRUE4MyIvPgo8c3RvcCBvZmZzZXQ9IjAuMDgzMzMzMyIgc3RvcC1jb2xvcj0iI0ZGREQzNSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRkE4MDAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)

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
    audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/demo/僕らの手には何もないけど.mp3',
    cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/demo/僕らの手には何もないけど.jpg',
    lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/demo/僕らの手には何もないけど.lrc',
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
| preload | String | `'metadata'` | [HTMLMediaElement.preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload) |
| color | String | `null` | The default theme color, can also be set in track info object in `playList`, which will overwrite the global color setting |
| playMode | String | `'order'` | Value can be one of `order`, `random`, and `single` |
| volume | Number | `0.7` | The default volume, range from 0 to 1 |
| storageName | String | `'alice-player-setting'` | The key prefix where we save values in cookie |

_Note: This plugin is still under heavy development, some options doesn't really work now._

## TODO

- [ ] Audio buffer progress
- [ ] Media error handling
- [ ] HLS stream support
- [ ] Vue component encapsulation
- [ ] Split vender script file
- [ ] Github Pages build workflow
