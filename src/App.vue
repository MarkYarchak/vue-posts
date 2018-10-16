<template>
  <div id="app">
      <posts></posts>
  </div>
</template>

<script>
import Posts from './components/Posts';
export default {
  name: 'app',
  components: {
      Posts,
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
