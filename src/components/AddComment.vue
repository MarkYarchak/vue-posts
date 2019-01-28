<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <textarea
        id="inpcom"
        v-model="selfcomment.comment"
        rows="2"
        wrap="hard"
        spellcheck="false"
        placeholder="Write your comment..."
      >Comment here
      </textarea>
      <div class="buttons-box">
        <button
          class="box-addcom__send"
          @click="createComment"
        >Send</button>
        <button
          class="box-addcom__save"
          @click="saveComment"
        >Save</button>
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
      buttonCommentInput: document.getElementsByClassName('box-addcom__send'),
      commentInput: document.getElementById('inpcoom'),
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
      commentFromStore: 'comment',
    }),
  },
  methods: {
    nothing() {},
    editComment() {
      console.log('watch', this.commentinf);
    },
    // replaceComment() {
    //   const tempPosts = this.postsFromStore.concat();
    //   const idx = tempPosts.findIndex(p => p.id === this.commentFromStore.postId);
    //   const tempComments = tempPosts[idx].comments.concat();
    //   const commentidx = tempComments.findIndex(c => c.id === this.commentFromStore.commentId);
    //   const currentComment = tempPosts[idx].tempComments[commentidx].concat();
    //   if (currentComment !== this.commentFromStore.commentText
    //     && idx !== -1 && commentidx !== -1) {
    //     tempPosts[idx].comments.replace(currentComment, this.selfcomment.comment);
    //   }
    // },
    pushComment(selfComment) {
      console.log('watch', this.commentFromStore);
      const tempPosts = this.postsFromStore.concat();
      const idx = tempPosts.findIndex(p => p.id === selfComment.postId);
      if (idx !== -1) {
        tempPosts[idx].comments.unshift(selfComment);// or push() it to end
      }
    },
    createComment() {
      this.selfcomment.id = Math.floor(Math.random() * 10000);
      if (this.selfcomment.createDate === '') {
        this.selfcomment.createDate = moment();
      }
      this.selfcomment.postId = this.post.id;
      if (this.selfcomment.comment !== '') {
        this.pushComment(this.selfcomment);
      }
      this.selfcomment.comment = '';
    },
    saveComment() {},
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
        background url('https://dogzone-tcwebsites.netdna-ssl.com/wp-content/uploads/2018/06/funny-dog-quotes-2.jpg') center center/cover no-repeat grey
        height 25px
        width 25px
        border-radius 50%
        padding 2px
    .box-addcom__inpcom
        display flex
        background-color #bb69d8
        border-radius 10px
        border 1px 0.5px 0.7px 0.5px solid #bb69d8
    #inpcom
        overflow-y hidden
        outline none
        line-height 15px
        border-radius 10px 10px 0 10px
        padding 6px 5px 2px 10px
        border 0.5px solid #bb69d8
        max-width 220px
        min-width 220px
        height 60px
        /*max-height 70px*/
        font-family "Arial", Arial, sans-serif
        font-size 13px
        resize none
    #inpcom:focus
        /*height 120px*/
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
        background-color #bb69d8
        color white
        border 1px solid #bb69d8
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
