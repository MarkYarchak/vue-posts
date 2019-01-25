<template>
  <div
    class="comments"
    @click="closeCommentsParameters"
  >
    <div
      v-for="(comment, index) in comments"
      v-if="index < countcom"
      :key="index"
      class="showcom">
      <OneComment
        :post="post"
        :comment="comment"
        @add-comment-like="likeComment"
        @del-comment-like="dislikeComment"
        @edit-comment="editComment"
      />
    </div>
    <div class="box-show-morecom">
      <div
        v-if="countcom < comments.length"
        class="show-morecom"
        @click="showMore"
      >Show more ({{ 5 > comments.length - countcom ? comments.length - countcom : 5 }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OneComment from './OneComment';

export default {
  name: 'PostComments',
  components: {
    OneComment,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      commentsDifference: null,
      posts: [],
      openParameters: null,
      countcom: 3,
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
    }),
  },
  created() {
    this.posts = this.postsFromStore;
    this.commentsDifference = this.comments.length - this.countcom;
  },
  methods: {
    showMore() {
      this.countcom += 5;
    },
    editComment(allAboutComment) {
      this.$emit('edit-comment', allAboutComment);
    },
    likeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempComments[commentidx].likes.push(likeData.user);
      }
    },
    dislikeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempComments[commentidx].likes = tempComments[commentidx].likes
          .filter(l => l.id !== likeData.user.id);
      }
    },
    closeCommentsParameters() {
      this.openParameters = !this.openParameters;
    },
  },
};
</script>

<style scoped
       lang="stylus"
>
  .showcom
      display flex
      flex-direction column
  .box-show-morecom
      display flex
      justify-content center
      margin 10px 3px 3px 3px
  .show-morecom
      color White
      font-size 16px
      font-family "Arial", Arial, sans-serif
      height 16px
      width 105px
      cursor pointer
      padding 2px
      background-color #d9d9d9
      border-radius 8%
</style>
