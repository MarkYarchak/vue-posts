<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div
        :style="{'background-image': `url(${ user.avatar })`}"
        class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <textarea
        id="post.id"
        ref="changingTextarea"
        :placeholder="variablePlaceholder"
        v-model="selfcomment.comment"
        class="inpcom"
        wrap="hard"
        spellcheck="false"
        @keypress.ctrl.enter="commentOperations"
      >Comment here
      </textarea>
      <!--<button-->
      <!--v-if="awesomeOperations || selfcomment.comment !== ''"-->
      <!--class="cancelCommentOperation"-->
      <!--@click="antiCommentOperations">-->
      <!--Cancel-->
      <!--</button>-->
      <div class="buttons-box">
        <button
          id="main_comment-button"
          class="btn-addcom"
          @click="commentOperations"
        >Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'AddComment',
  props: {
    selfcomment: {
      type: Object,
      default: () => ({}),
    },
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      awesomeOperations: false,
      selectedPost: null,
      variablePlaceholder: 'Write your comment...',
    };
  },
  computed: {
    ...mapGetters([
      'posts',
      'commentOrAnswer',
      'user',
    ]),
  },
  watch: {},
  created() {
    this.selfcomment.author = this.user;
  },
  methods: {
    commentOperations() {
      if (this.variablePlaceholder === 'Write your comment...') {
        this.createComment();
      }
      if (this.variablePlaceholder === 'Edit your comment...') {
        this.awesomeOperations = true;
        this.editComment();
      }
      if (this.variablePlaceholder === 'Answer to the comment...') {
        this.awesomeOperations = true;
        this.createCommentAnswer();
      }
      if (this.variablePlaceholder === 'Edit your answer...') {
        this.awesomeOperations = true;
        this.editCommentAnswer();
      }
      if (this.variablePlaceholder === 'Write your reply to answer...') {
        this.awesomeOperations = true;
        this.answerOnAnswer();
      }
      this.selfcomment.comment = '';
    },
    antiCommentOperations() {
      this.variablePlaceholder = 'Write your comment...';
      this.selfcomment.comment = '';
    },
    createComment() {
      if (this.selfcomment.comment !== '') {
        this.awesomeOperations = true;
      }
      this.selfcomment.id = Math.floor(Math.random() * 10000);
      if (this.selfcomment.createDate === '') {
        this.selfcomment.createDate = moment();
      }
      this.selfcomment.postId = this.post.id;
      if (this.selfcomment.comment !== '') {
        const tempPosts = this.posts.concat();
        const idx = tempPosts.findIndex(p => p.id === this.selfcomment.postId);
        if (idx !== -1) {
          tempPosts[idx].comments.unshift(this.selfcomment);// or push() it to end
        }
      }
      this.variablePlaceholder = 'Write your comment...';
    },
    editComment() {
      const tempPosts = this.posts.concat();
      const idx = tempPosts.findIndex(p => p.id === this.commentOrAnswer.postId);
      const tempComments = tempPosts[idx].comments.concat();
      const commentidx = tempComments
        .findIndex(c => c.id === this.commentOrAnswer.commentId);
      const currentComment = tempComments[commentidx].concat();
      if (currentComment.comment !== this.commentOrAnswer.commentText
        && idx !== -1 && commentidx !== -1) {
        tempPosts[idx].comments.replace(currentComment.comment, this.selfcomment.comment);
      }
      this.variablePlaceholder = 'Write your comment...';
    },
    createCommentAnswer() {
      this.selfcomment.id = Math.floor(Math.random() * 10000);
      if (this.selfcomment.createDate === '') {
        this.selfcomment.createDate = moment();
      }
      if (this.selfcomment.comment !== '') {
        const tempPosts = this.posts.concat();
        const idx = tempPosts.findIndex(p => p.id === this.commentOrAnswer.postId);
        const tempComments = tempPosts[idx].comments.concat();
        const commentidx = tempComments
          .findIndex(c => c.id === this.commentOrAnswer.commentId);
        if (idx !== -1 && commentidx !== -1) {
          tempComments[commentidx].answers.unshift(this.selfcomment);
        }
      }
      this.variablePlaceholder = 'Write your comment...';
    },
    editCommentAnswer() {
      const tempPosts = this.posts.concat();
      const idx = tempPosts.findIndex(p => p.id === this.commentOrAnswer.postId);
      const tempComments = tempPosts[idx].comments.concat();
      const commentidx = tempComments
        .findIndex(c => c.id === this.commentOrAnswer.commentId);
      const tempAnswers = tempComments[commentidx].answers.concat();
      const answeridx = tempAnswers.findIndex(a => a.id === this.commentOrAnswer.answerId);
      const currentAnswer = tempAnswers[answeridx];
      if (currentAnswer.comment !== this.commentOrAnswer.commentText
              && idx !== -1 && commentidx !== -1) {
        tempPosts[idx].comments.replace(currentAnswer.comment, this.selfcomment.comment);
      }
      this.variablePlaceholder = 'Write your comment...';
    },
    answerOnAnswer() {},
  },
};
</script>

<style scoped
       lang="stylus"
>
    .box-addcom
        display flex
        align-items center
        font-family "Arial", Arial, sans-serif
        padding 5px
    .box-addcom__my-avatar
        margin 5px
    .avatar
        background center center/cover no-repeat grey
        height 27px
        width 27px
        border-radius 50%
        padding 2px
    .box-addcom__inpcom
        display flex
        background-color #8c8d9f
        border-radius 10px
        border 1px 0.5px 0.7px 0.5px solid #8c8d9f
    .inpcom
        overflow-y hidden
        outline none
        line-height 15px
        border-radius 10px 10px 0 10px
        padding 6px 5px 2px 10px
        border 0.5px solid #8c8d9f
        width 230px
        height 60px
        /*max-height 70px*/
        font-family "Arial", Arial, sans-serif
        font-size 13px
        resize none
        background-color #fff
    #inpcom:focus
        height 120px
        outline none
    .buttons-box
        width 60px
        display flex
        justify-content space-around
        align-items center
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
    .btn-addcom
        cursor pointer
        border-radius 0 10px 10px 0
        height 23px
        width 50px
        background-color #8c8d9f
        color white
        border 1px solid #8c8d9f
    .btn-addcom:focus
        outline none
</style>
