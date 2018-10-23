<template>
  <div>
    <ul>
      <post-item
        v-for="(item, key) in posts"
        :key="key"
        :post="item"
      />
    </ul>
  </div>
</template>

<script>
import post from '../data/posts';
import PostItem from './PostItem';

export default {
  name: 'UserPosts',
  components: {
    PostItem,
  },
  computed: {
    posts() {
      return post;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
    lang="stylus"
    scoped
>

</style>
