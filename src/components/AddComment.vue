<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div
        :style="{'background-image': `url(${ userFromStore.avatar })`}"
        class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <textarea
        id="post.id"
        v-model="selfcomment.comment"
        class="inpcom"
        wrap="hard"
        spellcheck="false"
        placeholder="Write your comment..."
      >Comment here
      </textarea>
      <div class="buttons-box">
        <button
          id="main_comment-button"
          class="box-addcom__send"
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
    commentinf: {
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
      selectedPostId: document.getElementById('selectedPost'),
      selectedPost: null,
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
      commentOrAnswerFromStore: 'commentOrAnswer',
      userFromStore: 'user',
    }),
  },
  created() {
    this.selectedPost = this.commentOrAnswerFromStore.getInputPlace;
  },
  methods: {
    commentOperations() {
      console.log('f', this.selectedPost);
      if (this.selectedPostId.placeholder === 'Write your comment...') {
        this.createComment();
      }
      if (this.selectedPostId.placeholder === 'Edit your comment...') {
        this.editComment();
      }
      if (this.selectedPostId.placeholder === 'Answer to the comment...') {
        this.createCommentAnswer();
      }
      if (this.selectedPostId.placeholder === 'Edit your answer...') {
        this.editCommentAnswer();
      }
      if (this.selectedPostId.placeholder === 'Write your reply to answer...') {
        this.answerOnAnswer();
      }
      this.selfcomment.comment = '';
    },
    createComment() {
      this.selfcomment.id = Math.floor(Math.random() * 10000);
      if (this.selfcomment.createDate === '') {
        this.selfcomment.createDate = moment();
      }
      this.selfcomment.postId = this.post.id;
      if (this.selfcomment.comment !== '') {
        const tempPosts = this.postsFromStore.concat();
        const idx = tempPosts.findIndex(p => p.id === this.selfcomment.postId);
        if (idx !== -1) {
          tempPosts[idx].comments.unshift(this.selfcomment);// or push() it to end
        }
      }
    },
    editComment() {
      const tempPosts = this.postsFromStore.concat();
      const idx = tempPosts.findIndex(p => p.id === this.commentFromStore.postId);
      const tempComments = tempPosts[idx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === this.commentFromStore.commentId);
      const currentComment = tempPosts[idx].tempComments[commentidx].concat();
      if (currentComment.comment !== this.commentFromStore.commentText
        && idx !== -1 && commentidx !== -1) {
        tempPosts[idx].comments.replace(currentComment, this.selfcomment.comment);
      }
    },
    createCommentAnswer() {
      this.selfcomment.id = Math.floor(Math.random() * 10000);
      if (this.selfcomment.createDate === '') {
        this.selfcomment.createDate = moment();
      }
      if (this.selfcomment.comment !== '') {
        const tempPosts = this.postsFromStore.concat();
        const idx = tempPosts.findIndex(p => p.id === this.commentFromStore.postId);
        const tempComments = tempPosts[idx].comments.concat();
        const commentidx = tempComments.findIndex(c => c.id === this.commentFromStore.commentId);
        if (idx !== -1 && commentidx !== -1) {
          tempComments[commentidx].answers.unshift(this.selfcomment);
        }
      }
    },
    editCommentAnswer() {
      const tempPosts = this.postsFromStore.concat();
      const idx = tempPosts.findIndex(p => p.id === this.answerFromStore.postId);
      const tempComments = tempPosts[idx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === this.commentFromStore.commentId);
      const currentComment = tempPosts[idx].tempComments[commentidx].concat();
      if (currentComment.comment !== this.commentFromStore.commentText
              && idx !== -1 && commentidx !== -1) {
        tempPosts[idx].comments.replace(currentComment, this.selfcomment.comment);
      }
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
        max-width 220px
        min-width 220px
        height 60px
        /*max-height 70px*/
        font-family "Arial", Arial, sans-serif
        font-size 13px
        resize none
    #inpcom:focus
        height 120px
        outline none
    .buttons-box
        display flex
        align-items center
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
    .box-addcom__send
        cursor pointer
        border-radius 0 10px 10px 0
        height 23px
        width 50px
        background-color #8c8d9f
        color white
        border 1px solid #8c8d9f
    .box-addcom__save
        display none
        cursor pointer
        border-radius 0 10px 10px 0
        height 23px
        width 50px
        background-color #bb69d8
        color white
        border 1px solid #bb69d8
    .box-addcom__send:focus
        outline none
</style>
