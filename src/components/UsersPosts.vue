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
        @add-comment-like="likeComment"
        @del-comment-like="dislikeComment"
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
    deletePostLike(delSelfLike) {
      const tempLike = this.posts.concat();
      const idx = tempLike.findIndex(p => p.id === delSelfLike.likeId);
      if (idx !== -1) {
        const dislike = tempLike[idx].likes.indexOf(this.selfLike);
        tempLike[idx].likes.splice(dislike, 1);
      }
    },
    likeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1) {
        if (commentidx !== -1) {
          tempComments[commentidx].likes.push(likeData.user);
        }
      }
    },
    dislikeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1) {
        if (commentidx !== -1) {
          tempComments[commentidx].likes = tempComments[commentidx].likes
            .filter(l => l.id !== likeData.user.id);
        }
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
