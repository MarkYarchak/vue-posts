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
        @add-comment-like="LikeComment"
        @del-comment-like="DislikeComment"
        @delete-comment="deleteComment"
        @edit-comment="editComment"
      />
    </div>
    <div class="box-show-morecom">
      <div
        v-if="countcom < comments.length"
        class="show-morecom"
        @click="showMore"
      >Show more</div>
    </div>
  </div>
</template>

<script>
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
      openParameters: null,
      countcom: 3,
    };
  },
  methods: {
    showMore() {
      this.countcom += 5;
    },
    deleteComment(allOfId) {
      this.$emit('delete-comment', allOfId);
    },
    editComment(textId) {
      this.$emit('edit-comment', textId);
    },
    LikeComment(selfLike) {
      this.$emit('add-comment-like', selfLike);
    },
    DislikeComment(selfLike) {
      this.$emit('del-comment-like', selfLike);
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
      margin 3px
  .show-morecom
      color White
      font-size 16px
      font-family "Arial", Arial, sans-serif
      height 16px
      width 81px
      cursor pointer
      padding 2px
      background-color #d9d9d9
      border-radius 8%
</style>
