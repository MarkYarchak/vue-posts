<template>
  <div class="comment-answer_items">
    <div
      id="edit"
      class="comment-item__item"
      data-title="Edit"
      @click="editCommentAnswer"
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
      @click="deleteCommentAnswer"
    >
      <i class="fas fa-trash-alt"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CommentAnswerItems',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    comment: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inputComment: document.getElementById('inpcom'),
      posts: [],
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
    editCommentAnswer() {
      this.inputComment.placeholder = 'Edit your answer...';
      this.$emit('edit-comment', {
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    answerOnAnswer() {
      this.inputComment.placeholder = 'Write your answer...';
      this.commentAnswer = true;
      this.$emit('answer-comment', {
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    deleteCommentAnswer() {
      this.commentDelete = true;
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === this.post.id);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === this.comment.id);
      const tempAnswers = tempPosts[postidx].comments[commentidx].answers.concat();
      const answeridx = tempAnswers.findIndex(a => a.id === this.answer.id);
      if (postidx !== -1 && commentidx !== -1 && answeridx !== -1) {
        tempPosts[postidx].comments[commentidx].answers = tempAnswers
          .filter(a => a.id !== this.answer.id);
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
