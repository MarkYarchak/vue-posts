<template>
  <div class="box-addcom">
    <div class="box-addcom__my-avatar">
      <div class="avatar"/>
    </div>
    <div class="box-addcom__inpcom">
      <form>
        <input
          id="inpcom"
          v-model="selfComment"
          type="text"
          placeholder="Write your comment..."
        >
      </form>
    </div>
    <button
      class="box-addcom__send"
      @click="createComment"
    >Send</button>
  </div>
</template>

<script>
export default {
  name: 'AddComment',
  data() {
    return {
      selfComment: {
        id: '16',
        author: {
          displayName: 'Mark Yarchak',
          username: '@markyarchak',
          avatar: 'https://files.brightside.me/files/news/part_4/46555/209005-3439210-1000-1446450434antarctic-1000-20e3fa6395-1484729696.jpg',
        },
        comment: '',
        createDate: '30s',
        likes: [],
      },
    };
  },
  methods: {
    createComment() {
      this.$emit('add-comment', { comment: this.selfComment });
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
    #inpcom
        width 230px
    .box-addcom__send
        cursor pointer
</style>
