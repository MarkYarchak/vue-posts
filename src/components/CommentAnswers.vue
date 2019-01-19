<template>
  <div class="comment_answers">
    <div class="close-commentanswers">
      <span>Answers (15)</span>
    </div>
    <!--<div class="open-commentanswers"></div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CommentAnswers',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    comment: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
    }),
  },
  mounted() {
    window.addEventListener('click', this.nothing);
  },
  destroed() {
    window.removeEventListener('click', this.nothing);
  },
  methods: {
    nothing() {
      // console.log('rfjgw', this.comment);
    },
  },
};
</script>

<style scoped
        lang="stylus"
>
    .close-commentanswers
        display flex
        justify-content center
</style>
