<template>
  <div class="comment-items">
    <!--v-if="comment.author.id === userFromStore.id"-->
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
    <!--v-if="comment.author.id === userFromStore.id"-->
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
      inputMessage: document.getElementById('post.id', '_textarea'),
      commentDelete: false,
      commentAnswer: false,

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
    editComment() {
      this.inputMessage.placeholder = 'Edit your comment...';
      this.inputMessage.value = this.comment.comment;
      this.inputMessage.focus();
      this.$store.dispatch('updateCommentOrAnswer', {
        editPlaceholder: this.inputMessage,
        commentText: this.comment.comment,
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    answerComment() {
      this.inputComment.placeholder = 'Answer to the comment...';
      this.inputComment.focus();
      this.commentAnswer = true;
      this.$store.dispatch('updateCommentOrAnswer', {
        getInputPlace: this.inputMessage,
        commentText: this.comment.comment,
        commentId: this.comment.id,
        postId: this.post.id,
      });
    },
    deleteComment() {
      this.commentDelete = true;
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
