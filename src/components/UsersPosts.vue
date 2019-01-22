<template>
  <div class="UsersPosts">
    <ul>
      <post-item
        v-for="(item, key) in posts"
        :key="key"
        :post="item"
        @edit-comment="editComment"
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
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
    }),
  },
  created() {
    this.posts = this.postsFromStore;
  },
  methods: {
    editComment(comment) {
      console.log('this working');
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
