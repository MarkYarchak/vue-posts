<template>
  <div class="comment-items">
    <div
      id="edit"
      class="comment-item__item"
      @click="editComment"
    >
      <i class="fas fa-edit"/>
    </div>
    <div
      id="answer"
      class="comment-item__item"
      @click="answerComment"
    >
      <i class="fas fa-comments"/>
    </div>
    <div
      id="delete"
      class="comment-item__item"
      @click="deleteComment"
    >
      <i class="fas fa-trash-alt"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CommentItems',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    comment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      commentDelete: false,
      commentAnswer: false,
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
    editComment() {
      this.$emit('edit-comment', {
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    answerComment() {
      this.commentAnswer = true;
      this.$emit('answer-comment', {
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    deleteComment() {
      this.commentDelete = true;
      this.decrementComments({
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    // countinue of deleteComment()
    decrementComments(allOfId) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === allOfId.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === allOfId.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempPosts[postidx].comments = tempComments.filter(c => c.id !== allOfId.commentId);
      }
    },
  },
};
</script>

<style
    lang="stylus"
    scoped
>
    .comment-items
        margin 3px 0 3px 0
        display flex
        justify-content space-around
    .comment-item__item
        margin 3px
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        font-size 13px
        color black
        cursor pointer
</style>
