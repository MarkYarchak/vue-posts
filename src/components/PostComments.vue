<template>
  <div class="comments">
    <div
      v-for="(comment, index) in comments"
      v-if="index < countcom"
      :key="index"
      class="showcom">
      <OneComment
        :comment="comment"
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
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      countcom: 2,
    };
  },
  methods: {
    showMore() {
      this.countcom += 2;
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
