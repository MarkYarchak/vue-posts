<template>
  <div class="comment-answer_items">
    <!--v-if="answer.author.id === userFromStore.id"-->
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
    <!--v-if="answer.author.id === userFromStore.id"-->
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
      inputMessage: document.getElementById('post.id'),
      posts: [],
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
      userFromStore: 'user',
    }),
  },
  created() {
    this.posts = this.postsFromStore;
  },
  methods: {
    editCommentAnswer() {
      this.inputMessage.placeholder = 'Edit your answer...';
      this.inputMessage.focus();
      this.inputMessage.value = this.answer.comment;
      this.$store.dispatch('updateCommentOrAnswer', {
        commentText: this.comment.comment,
        commentId: this.comment.id,
        postId: this.post.id,
        answerId: this.answer.id,
      });
    },
    answerOnAnswer() {
      this.inputMessage.placeholder = 'Write your reply to answer...';
      this.inputMessage.focus();
      this.$store.dispatch('updateCommentOrAnswer', {
        commentText: this.comment.comment,
        commentId: this.comment.id,
        postId: this.post.id,
        answerId: this.answer.id,
        usernameOfCompanion: this.answer.author.username,
      });
    },
    deleteCommentAnswer() {
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
        // content attr(data-title)
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
