<template>
  <div class="content">
    <div
      v-if="post.content.imageUrl"
      :style="{'background-image': `url(${ post.content.imageUrl })`}"
      class="image"
    />
    <p v-if="post.content.text">
      {{ post.content.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContentPost',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style
    lang="stylus"
    scoped
>
    .image
        flex-grow 1
        background center center/cover no-repeat lightgoldenrodyellow
        width 343px
        height 176px
    p
        font-family "Arial", Arial, sans-serif
        color rgb(0 0 0)
        font-size 15px
        line-height 20px
        letter-spacing -0.2px
        padding 10px
        margin 0
        padding-left 16px
</style>
