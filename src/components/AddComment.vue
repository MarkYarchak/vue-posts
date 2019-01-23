<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <textarea
        id="inpcom"
        v-model="selfcomment.comment"
        wrap="hard"
        placeholder="Write your comment...">Comment here</textarea>
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
      selfComment: {
        id: '',
        author: {
          displayName: 'Mark Yarchak',
          username: 'markyarchak',
          avatar: 'https://dogzone-tcwebsites.netdna-ssl.com/wp-content/uploads/2018/06/funny-dog-quotes-2.jpg',
        },
        comment: '',
        createDate: '',
        likes: [],
      },
      temporaryPosts: 0,
      temporaryComments: 0,
      postidx: this.post.id,
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
    }),
  },
  methods: {
    nothing() {},
    editComment() {
      console.log('watch', this.commentinf);
    },
    pushComment(selfComment) {
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
        height auto
        border-radius 10px 10px 0 10px
        padding 2px 5px 2px 10px
        border 0.5px solid #bb69d8
        max-width 220px
        min-width 220px
        min-height 51px
        max-height 120px
        font-family "Arial", Arial, sans-serif
        font-size 13px
        /*resize none*/
    #inpcom:focus
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
