<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <input
        id="inpcom"
        v-model="selfComment.comment"
        type="text"
        placeholder="Write your comment..."
      >
      <button
        class="box-addcom__send"
        @click="createComment"
      >Send</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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
      selfComment: {
        id: '',
        author: {
          displayName: 'Mark Yarchak',
          username: 'markyarchak',
          avatar: 'http://wallfon.com/walls/others/nice.jpg',
        },
        comment: '',
        createDate: '',
        likes: [],
      },
    };
  },
  methods: {
    createComment() {
      if (this.selfComment.createDate === '') {
        this.selfComment.createDate = moment();
      }
      this.selfComment.postId = this.post.id;
      if (this.selfComment.comment !== '') {
        this.$emit('add-comment', this.selfComment);
      }
      this.selfComment.comment = '';
    },
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
        background url('http://wallfon.com/walls/others/nice.jpg') center center/cover no-repeat grey
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
    .box-addcom__send:focus
      outline none
</style>
