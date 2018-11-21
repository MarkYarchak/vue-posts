<template>
  <div
    class="post-item"
  >
    <HighPost
      :post="post"
    />
    <ContentPost
      :post="post"
    />
    <DownPost
      :post="post"
      @add-comment="createComment"
    />
  </div>
</template>

<script>
import HighPost from './HighPost';
import ContentPost from './ContentPost';
import DownPost from './DownPost';

export default {
  name: 'PostItem',
  components: {
    HighPost,
    ContentPost,
    DownPost,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {

    };
  },
  methods: {
    createComment(selfComment) {
      this.$emit('add-comment', selfComment);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style
    lang="stylus"
    scoped
>
    .post-item
        width 343px
        display flex
        flex-direction column
        border-radius 8px
        margin-bottom 10px
        background-color rgba(216 216 216 0)
        box-shadow 0 1px 2px 0 rgba(0 0 0 0.18),
        0 1px 2px 0 rgba(0 0 0 0.04), 0 2px 6px 0 rgba(0 0 0 0.04)
</style>
