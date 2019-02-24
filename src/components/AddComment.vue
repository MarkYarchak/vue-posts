<template>
  <div class="box_input-cencel">
    <div class="active_parameters-box">
      <v-spacer/>
      <v-btn
        v-if="awesomeOperations.editCom || awesomeOperations.createAns ||
          awesomeOperations.editAns || awesomeOperations.answerAns || awesomeOperations.createCom &&
        selfComment.comment !== ''"
        color="rgba(212,212,212,0.65)"
        class="btn-cancel_comment_operation"
        @click="antiCommentOperations">
        Cancel
      </v-btn>
    </div>
    <div class="box-addcom">
      <div class="box-addcom__my-avatar">
        <div
          :style="{'background-image': `url(${ user.avatar })`}"
          class="avatar"/>
      </div>
      <div class="box-addcom__inpcom">
        <textarea
          ref="changingTextarea"
          :id="post.id"
          :placeholder="inputMenu.variablePlaceholder"
          v-model="selfComment.comment"
          class="inpcom"
          wrap="hard"
          spellcheck="false"
          @keypress.ctrl.enter="commentOperations"
        >Comment here
        </textarea>
        <div class="buttons-box">
          <button
            id="main_comment-button"
            class="btn-addcom"
            @click="commentOperations"
          >Send</button>
        </div>
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
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inputMenu: {
        variablePlaceholder: 'Write your comment...',
      },
      selfComment: {
        id: '',
        author: {},
        comment: '',
        createDate: '',
        likes: [],
      },
      awesomeOperations: {
        createCom: true,
        editCom: false,
        createAns: false,
        editAns: false,
        answerAns: false,
      },
      defaultInputAction: 'Write your comment',
    };
  },
  computed: {
    ...mapGetters([
      'posts',
      'commentOrAnswer',
      'user',
      'inputAction',
    ]),
  },
  watch: {
    inputAction(newValue) {
      const AO = this.awesomeOperations;
      switch (newValue) {
        case 'Edit your comment': {
          AO.createCom = false;
          AO.editCom = true;
          AO.createAns = false;
          AO.editAns = false;
          AO.answerAns = false;
          break;
        }
        case 'Answer to the comment': {
          AO.createCom = false;
          AO.editCom = false;
          AO.createAns = true;
          AO.editAns = false;
          AO.answerAns = false;
          break;
        }
        case 'Edit your answer': {
          AO.createCom = false;
          AO.editCom = false;
          AO.createAns = false;
          AO.editAns = true;
          AO.answerAns = false;
          break;
        }
        case 'Reply to answer': {
          AO.createCom = false;
          AO.editCom = false;
          AO.createAns = false;
          AO.editAns = false;
          AO.answerAns = true;
          break;
        }
        default: {
          AO.createCom = true;
          AO.editCom = false;
          AO.createAns = false;
          AO.editAns = false;
          AO.answerAns = false;
          break;
        }
      }
    },
  },
  created() {
    this.selfComment.author = this.user;
  },
  methods: {
    commentOperations() {
      if (this.selfComment.comment !== '') {
        switch (this.inputAction) {
          case 'Edit your comment': { this.editComment(); break; }
          case 'Answer to the comment': { this.createCommentAnswer(); break; }
          case 'Edit your answer': { this.editCommentAnswer(); break; }
          case 'Reply to answer': { this.answerOnAnswer(); break; }
          default: { this.createComment(); break; }
        }
      }
      this.selfComment.comment = '';
    },
    antiCommentOperations() {
      this.inputMenu.variablePlaceholder = 'Write your comment...';
      this.$refs.changingTextarea.placeholder = 'Write your comment...';
      this.selfComment.comment = '';
      this.$store.dispatch('setInputAction', this.defaultInputAction);
      const AO = this.awesomeOperations;
      AO.createCom = true;
      AO.editCom = false;
      AO.createAns = false;
      AO.editAns = false;
      AO.answerAns = false;
    },
    createComment() {
      this.selfComment.id = Math.floor(Math.random() * 10000);
      if (this.selfComment.createDate === '') {
        this.selfComment.createDate = moment();
      }
      this.selfComment.postId = this.post.id;
      if (this.selfComment.comment !== '') {
        const tempPosts = this.posts.concat();
        const idx = tempPosts.findIndex(p => p.id === this.selfComment.postId);
        if (idx !== -1) {
          tempPosts[idx].comments.unshift(this.selfComment);// or push() it to end
        }
      }
      this.inputMenu.variablePlaceholder = 'Write your comment...';
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
        tempPosts[idx].comments.replace(currentComment.comment, this.selfComment.comment);
        this.inputMenu.variablePlaceholder = 'Write your comment...';
      }
    },
    createCommentAnswer() {
      this.selfComment.id = Math.floor(Math.random() * 10000);
      if (this.selfComment.createDate === '') {
        this.selfComment.createDate = moment();
      }
      if (this.selfComment.comment !== '') {
        const tempPosts = this.posts.concat();
        const idx = tempPosts.findIndex(p => p.id === this.commentOrAnswer.postId);
        const tempComments = tempPosts[idx].comments.concat();
        const commentidx = tempComments
          .findIndex(c => c.id === this.commentOrAnswer.commentId);
        if (idx !== -1 && commentidx !== -1) {
          tempComments[commentidx].answers.unshift(this.selfComment);
          this.inputMenu.variablePlaceholder = 'Write your comment...';
        }
      }
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
        tempPosts[idx].comments.replace(currentAnswer.comment, this.selfComment.comment);
        this.inputMenu.variablePlaceholder = 'Write your comment...';
      }
    },
    answerOnAnswer() {},
  },
};
</script>

<style scoped
       lang="stylus"
>   .box_input-cencel
        display flex
        flex-direction column
        padding 5px
        font-family "Arial", Arial, sans-serif
    .active_parameters-box
        display flex
        margin 0 5px 0 37px
        align-items end
    .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat)
        font-family "Arial", Arial, sans-serif
        margin 0 30px 0 0
        text-transform none
        /*margin-right 50px*/
        color darkred
        height 20px
        width 35px
    .box-addcom
        display flex
        align-items center
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
        border 1px solid #8c8d9f
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
