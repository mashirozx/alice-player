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
    background: #9796f0;
    background: linear-gradient(to right, #fbc7d4, #9796f0);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
