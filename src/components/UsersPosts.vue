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
        @delete-comment="deleteComment"
        @edit-comment="editComment"
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
      temporaryPosts: 0,
      temporaryComments: 0,
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
        tempPosts[idx].comments.unshift(selfComment);// or push() if to end
        this.posts = JSON.parse(JSON.stringify(tempPosts));
      }
    },
    deleteComment(comment) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === comment.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === comment.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempPosts[postidx].comments = tempComments.filter(c => c.id !== comment.commentId);
      }
    },
    // editComment(comment) {
    // @click="commentItemsFalse"
    // },
    createPostLike(selfLike) {
      const tempPosts = this.posts.concat();
      const idx = tempPosts.findIndex(p => p.id === selfLike.postId);
      if (idx !== -1) {
        tempPosts[idx].likes.push(selfLike.user);
      }
    },
    deletePostLike(selfLike) {
      const tempPosts = this.posts.concat();
      const idx = tempPosts.findIndex(p => p.id === selfLike.postId);
      if (idx !== -1) {
        tempPosts[idx].likes = tempPosts[idx].likes
          .filter(l => l.id !== selfLike.user.id);
      }
    },
    likeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempComments[commentidx].likes.push(likeData.user);
      }
    },
    dislikeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempComments[commentidx].likes = tempComments[commentidx].likes
          .filter(l => l.id !== likeData.user.id);
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
