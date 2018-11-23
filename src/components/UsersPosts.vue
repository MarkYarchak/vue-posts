<template>
  <div class="UsersPosts">
    <ul>
      <post-item
        v-for="(item, key) in posts"
        :key="key"
        :post="item"
        @add-comment="createComment"
        @add-post-like="createPostLike"
      />
    </ul>
  </div>
</template>

<script>
import moment from 'moment';
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
  methods: {
    createComment(selfComment) {
      const tempPosts = this.posts.concat();
      const idx = tempPosts.findIndex(p => p.id === selfComment.postId);
      if (idx !== -1) {
        tempPosts[idx].comments.push(selfComment);
        this.posts = JSON.parse(JSON.stringify(tempPosts));
      }
    },
    createPostLike(selfLike) {
      const tempLike = this.posts.concat();
      const idx = tempLike.findIndex();
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
