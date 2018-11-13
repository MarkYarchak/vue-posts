<template>
  <div>
    <ul>
      <post-item
        v-for="(item, key) in posts"
        :key="key"
        :post="item"
        @add-comment="createComment"
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
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.posts = post;
  },
  // computed: {
  //   posts() {
  //     return post;
  //   },
  // },
  methods: {
    createComment(selfComment, { id }) {
      const tempPosts = this.posts.concat();
      const idx = tempPosts.findIndex(p => p.id === id);
      console.log('tempPosts ', tempPosts);
      // this.post.comments.push(selfComment.comment);
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
