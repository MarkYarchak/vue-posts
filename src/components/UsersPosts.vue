<template>
  <div class="UsersPosts">
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
import { mapGetters } from 'vuex';
import PostItem from './PostItem';

export default {
  name: 'UserPosts',
  components: {
    PostItem,
  },
  computed: {
    ...mapGetters([
      'posts',
    ]),
  },
};
</script>

<style
    lang="stylus"
    scoped
>
  .UsersPosts
      margin-top 20px
</style>
