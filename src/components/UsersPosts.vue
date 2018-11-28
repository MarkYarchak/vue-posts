<template>
  <div class="UsersPosts">
    <ul>
      <post-item
        v-for="(item, key) in posts"
        :key="key"
        :post="item"
        @add-comment="createComment"
        @add-post-like="createPostLike"
        @del-post-like="deletePostLike"
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
      const idx = tempLike.findIndex(p => p.id === selfLike.likeId);
      if (idx !== -1) {
        tempLike[idx].likes.push(selfLike);
      }
    },
    deletePostLike(DelSelfLike) {
      const tempLike = this.posts.concat();
      const idx = tempLike.findIndex(p => p.id === DelSelfLike.likeId);
      if (idx !== -1) {
        const dislike = tempLike[idx].likes.indexOf(this.selfLike);
        tempLike[idx].likes.splice(dislike, 1);
      }
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
