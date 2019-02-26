<template>
  <div class="box_input-cencel">
    <div class="active_parameters-box">
      <div
        v-if="awesomeOperations.editCom || awesomeOperations.createAns ||
        awesomeOperations.editAns || awesomeOperations.answerAns"
        class="used_comment-or-answer"
      >
        <div class="used_comment-or-answer__receiver">
          <b>{{ awesomeOperations.editCom || awesomeOperations.editAns ?
          'Edit comment' : answerOrComment.username }}</b>
        </div>
        <div class="used_comment-or-answer__text">
          {{ answerOrComment.commentText }}
        </div>
      </div>
      <div
        v-if="awesomeOperations.editCom || awesomeOperations.createAns ||
        awesomeOperations.editAns || awesomeOperations.answerAns"
        class="btn-cencel-box"
      >
        <div
          class="btn-cancel_comment_operation"
          @click="antiCommentOperations"
        >
          Cancel
        </div>
      </div>
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
          >
            <i
              v-if="awesomeOperations.createCom"
              class="fas fa-paper-plane"/>
            <i
              v-if="awesomeOperations.editCom || awesomeOperations.editAns"
              class="fas fa-edit"/>
            <i
              v-if="awesomeOperations.createAns || awesomeOperations.answerAns"
              class="fas fa-comments"
            />
          </button>
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
      defaultInputAction: 'Write your comment',
    };
  },
  computed: {
    ...mapGetters([
      'posts',
      'answerOrComment',
      'user',
      'inputAction',
      'awesomeOperations',
      'changingUsername',
    ]),
  },
  watch: {
    changingUsername() {
      if (this.inputAction.editCom || this.inputAction.editAns) {
        this.selfComment.comment = this.answerOrComment.commentText;
      }
    },
    inputAction(newValue) {
      switch (newValue) {
        case 'Write your comment': {
          this.$store.dispatch('setInputAction', {
            createCom: true,
            editCom: false,
            createAns: false,
            editAns: false,
            answerAns: false,
          });
          this.$refs.changingTextarea.placeholder = 'Write your comment...';
          break;
        }
        case 'Edit your comment': {
          this.$store.dispatch('setInputAction', {
            createCom: false,
            editCom: true,
            createAns: false,
            editAns: false,
            answerAns: false,
          });
          this.$refs.changingTextarea.value = this.answerOrComment.commentText;
          this.$refs.changingTextarea.placeholder = 'Edit your comment...';
          this.selfComment.comment = this.answerOrComment.commentText;
          break;
        }
        case 'Answer to the comment': {
          this.$store.dispatch('setInputAction', {
            createCom: false,
            editCom: false,
            createAns: true,
            editAns: false,
            answerAns: false,
          });
          this.$refs.changingTextarea.value = this.answerOrComment.commentText;
          this.$refs.changingTextarea.placeholder = 'Answer to the comment...';
          break;
        }
        case 'Edit your answer': {
          this.$store.dispatch('setInputAction', {
            createCom: false,
            editCom: false,
            createAns: false,
            editAns: true,
            answerAns: false,
          });
          this.$refs.changingTextarea.value = this.answerOrComment.commentText;
          this.$refs.changingTextarea.placeholder = 'Edit your answer...';
          this.selfComment.comment = this.answerOrComment.commentText;
          break;
        }
        case 'Reply to answer': {
          this.$store.dispatch('setInputAction', {
            createCom: false,
            editCom: false,
            createAns: false,
            editAns: false,
            answerAns: true,
          });
          this.$refs.changingTextarea.value = this.answerOrComment.commentText;
          this.$refs.changingTextarea.placeholder = 'Write your reply to answer...';
          break;
        }
        default: {
          this.$store.dispatch('setInputAction', {
            createCom: true,
            editCom: false,
            createAns: false,
            editAns: false,
            answerAns: false,
          });
          this.$refs.changingTextarea.placeholder = 'Write your comment...';
          this.inputMenu.variablePlaceholder = 'Write your comment...';
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
    },
    clearFunction() {
      this.$store.dispatch('updateCommentOrAnswer', {
        inpAction: 'Write your comment',
        commentText: '',
        username: '',
        postId: null,
        commentId: null,
        answerId: null,
      });
    },
    antiCommentOperations() {
      this.clearFunction();
      this.selfComment.comment = '';
      this.$store.dispatch('setInputAction', {
        createCom: true,
        editCom: false,
        createAns: false,
        editAns: false,
        answerAns: false,
      });
      this.$refs.changingTextarea.focus();
    },
    createComment() {
      if (this.selfComment.comment !== '') {
        this.selfComment.id = Math.floor(Math.random() * 10000);
        this.$store.dispatch('createMyComment', {
          myComment: {
            id: this.selfComment.id,
            author: this.user,
            comment: this.selfComment.comment,
            createDate: moment(),
            likes: [],
            answers: [],
          },
          postId: this.post.id,
        });
        this.antiCommentOperations();
      }
    },
    editComment() {
      if (this.selfComment.comment !== '') {
        this.$store.dispatch('editMyComment', {
          myComment: {
            comment: this.selfComment.comment,
          },
          postId: this.answerOrComment.postId,
          commentId: this.answerOrComment.commentId,
        });
        this.antiCommentOperations();
      }
    },
    createCommentAnswer() {
      this.selfComment.id = Math.floor(Math.random() * 10000);
      this.$store.dispatch('createMyAnswer', {
        myAnswer: {
          id: this.selfComment.id,
          author: this.user,
          usernameOfCompanion: '',
          comment: this.selfComment.comment,
          createDate: moment(),
          likes: [],
        },
        postId: this.answerOrComment.postId,
        commentId: this.answerOrComment.commentId,
      });
      this.antiCommentOperations();
    },
    editCommentAnswer() {
      if (this.selfComment.comment !== '') {
        this.$store.dispatch('editMyAnswer', {
          myComment: {
            comment: this.selfComment.comment,
          },
          postId: this.answerOrComment.postId,
          commentId: this.answerOrComment.commentId,
          answerId: this.answerOrComment.answerId,
        });
        this.antiCommentOperations();
      }
    },
    answerOnAnswer() {
      this.selfComment.id = Math.floor(Math.random() * 10000);
      this.$store.dispatch('myReplyAnswer', {
        myAnswer: {
          id: this.selfComment.id,
          author: this.user,
          usernameOfCompanion: this.answerOrComment.username,
          comment: this.selfComment.comment,
          createDate: moment(),
          likes: [],
        },
        postId: this.answerOrComment.postId,
        commentId: this.answerOrComment.commentId,
      });
      this.antiCommentOperations();
    },
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
        margin 0 10px 0 38px
        justify-content space-between
        align-items center
        aling-items center
        height 42px
    .used_comment-or-answer
        background-color whitesmoke
        display flex
        flex-direction column
        border-left 4px solid blue
        padding 5px 1px 5px 5px
        width 232px
    .used_comment-or-answer__text
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .btn-cencel-box
        width 52px
        display flex
        align-items center
        flex-grow 1
        height 42px
        background-color whitesmoke
        margin-right 6px
        padding-right 6px
        padding-left 2px
    .btn-cancel_comment_operation
        background-color inherit
        font-family "Arial", Arial, sans-serif
        color blue
        -webkit-transition all 0.2s ease
        -moz-transition all 0.2s ease
        -o-transition all 0.2s ease
    .btn-cancel_comment_operation:active
        background-color lavender
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
        border-radius 4px 10px 10px 4px
        border 1px solid #8c8d9f
    .inpcom
        overflow-y hidden
        outline none
        line-height 15px
        border-radius 4px 4px 4px 4px
        padding 5px 5px 2px 5px
        border 0.5px solid #8c8d9f
        width 230px
        height 70px
        font-family "Arial", Arial, sans-serif
        font-size 13px
        resize none
        background-color #fff
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
        font-weight bolder
        border-radius 0 10px 10px 0
        height 23px
        width 50px
        background-color #8c8d9f
        color white
        border 1px solid #8c8d9f
    .btn-addcom:focus
        outline none
    .btn-addcom:active
        height 50px
        width 50px
        border-radius 50%
        -webkit-transform scale(1.25)
        -ms-transform scale(1.25)
        -moz-transform scale(1.25)
        transform scale(1.25)
</style>
