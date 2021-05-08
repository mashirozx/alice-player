<template>
  <Player></Player>
</template>

<script>
  import Player from './components/Player.vue'
  export default {
    name: 'App',
    components: { Player },
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    height: 100vh;
    // background: linear-gradient(to bottom left, #c0cfb2 10%, #8ba989 80%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
