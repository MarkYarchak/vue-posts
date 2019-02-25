<template>
  <div class="comment-items">
    <!--v-if="comment.author.id === user.id"-->
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
      @click="answerComment"
    >
      <i class="fas fa-comments"/>
    </div>
    <!--v-if="comment.author.id === user.id"-->
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
      inputAction: '',
      inputMessage: document.getElementById(this.post.id),
    };
  },
  computed: {
    ...mapGetters([
      'posts',
      'user',
    ]),
  },
  methods: {
    editComment() {
      console.log();
      this.inputMessage.placeholder = 'Edit your comment...';
      this.inputMessage.focus();
      this.inputAction = 'Edit your comment';
      this.$store.dispatch('updateCommentOrAnswer', {
        inpAction: this.inputAction,
        commentText: this.comment.comment,
        username: this.comment.author.username,
        postId: this.post.id,
        commentId: this.comment.id,
      });
    },
    answerComment() {
      this.inputAction = 'Answer to the comment';
      this.inputMessage.placeholder = 'Answer to the comment...';
      this.inputMessage.focus();
      this.$store.dispatch('updateCommentOrAnswer', {
        inpAction: this.inputAction,
        commentText: this.comment.comment,
        username: this.comment.author.username,
        postId: this.post.id,
        commentId: this.comment.id,
      });
    },
    deleteComment() {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === this.post.id);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === this.comment.id);
      if (postidx !== -1 && commentidx !== -1) {
        tempPosts[postidx].comments = tempComments.filter(c => c.id !== this.comment.id);
      }
    },
  },
};
</script>

<style
    lang="stylus"
    scoped
>
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
