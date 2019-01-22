<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <input
        id="inpcom"
        v-model="selfcomment.comment"
        type="text"
        placeholder="Write your comment..."
      >
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
          avatar: 'http://www.austinhealthydentist.com/wp-content/uploads/2016/01/istock-649754038-guy-smiling-web.jpg',
        },
        comment: '',
        createDate: '',
        likes: [],
      },
      temporaryPosts: 0,
      temporaryComments: 0,
      postidx: this.post.id,
      // inputField: document.getElementsByTagName('input'),
      // placeholder: this.inputField.getAttribute('placeholder'),
      // :value="inputField"
    };
  },
  // watch: {
  //   commentinf() {
  //     this.editComment();
  //   },
  // },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
      // onePost: 'onepost',
      // myComments: 'comments',
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
        this.postsFromStore = JSON.parse(JSON.stringify(tempPosts));
      }
    },
    createComment() {
      // this.placeholder = 'Write your answer...';
      this.selfcomment.id = Math.floor(Math.random() * 10000);
      if (this.selfcomment.createDate === '') {
        this.selfcomment.createDate = moment();
      }
      this.selfcomment.postId = this.post.id;
      if (this.selfcomment.comment !== '') {
        this.pushComment(this.selfcomment);
        // this.$emit('add-comment', this.selfcomment);
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
        background url('http://www.austinhealthydentist.com/wp-content/uploads/2016/01/istock-649754038-guy-smiling-web.jpg') center center/cover no-repeat grey
        height 25px
        width 25px
        border-radius 50%
        padding 2px
    .box-addcom__inpcom
        display flex
        background-color rgb(162 55 243)
        border-radius 10px
        border 0.5px solid rgb(162 55 243)
    #inpcom
        margin 0.5px
        border-radius 10px
        padding 0 5px 0 5px
        border 0.5px solid rgb(162 55 243)
        width 220px
    #inpcom:focus
        outline none
    .box-addcom__send
        cursor pointer
        border-radius 0 10px 10px 0
        height 23px
        width 50px
        background-color rgb(162 55 243)
        color white
        border 1px solid rgb(162 55 243)
    .box-addcom__save
        display none
        cursor pointer
        border-radius 0 10px 10px 0
        height 23px
        width 50px
        background-color rgb(162 55 243)
        color white
        border 1px solid rgb(162 55 243)
    .box-addcom__send:focus
        outline none
</style>
