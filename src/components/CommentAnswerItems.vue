<template>
  <div class="comment-answer_items">
    <div
      id="edit"
      class="comment-item__item"
      data-title="Edit"
      @click="editComment"
    >
      <i class="fas fa-edit"/>
    </div>
    <div
      id="answer"
      class="comment-item__item"
      data-title="Reply"
      @click="answerOnAnswer"
    >
      <i class="fas fa-comments"/>
    </div>
    <div
      id="delete"
      class="comment-item__item"
      data-title="Delete"
      @click="deleteComment"
    >
      <i class="fas fa-trash-alt"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentAnswerItems',
  data() {
    return {
      showCommentAnswerItems: false,
      commentDelete: false,
      commentAnswer: false,
    };
  },
  mounted() {
    window.addEventListener('click', this.closeCommentAnswerParameters);
  },
  destroed() {
    window.removeEventListener('click', this.closeCommentAnswerParameters);
  },
  methods: {
    closeCommentAnswerParameters() {
      this.showCommentAnswerItems = false;
    },
    editComment() {
      this.$emit('edit-comment', {
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    answerOnAnswer() {
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
    // continue of deleteComment()
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

<style scoped
        lang="stylus">
    .comment-answer_items
        display flex
        justify-content space-around
    .comment-item__item:hover::after
        content attr(data-title)
        margin 1px 0 1px 4px
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        font-size 11px
        font-weight bolder
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
