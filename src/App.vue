<template>
  <div id="app">
    <posts/>
  </div>
</template>

<script>
// import Posts from './components/UsersPosts';

export default {
  name: 'App',
  components: {
    Posts: () => import('./components/UsersPosts'),
  },
};
</script>

<style
  lang="stylus"
>
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

</style>
