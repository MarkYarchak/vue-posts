<template>
  <div class="high">
    <div class="high__left">
      <div class="high__avatar-box">
        <div
          :style="{'background-image': `url(${post.author.avatar})`}"
          class="high__avatar"
        />
      </div>
      <div class="high__title-box">
        <div class="high__title">{{ post.author.displayName }}</div>
        <div class="high__sub-title">{{ post.author.username }}</div>
      </div>
    </div>
    <div class="high__right">
      <div class="high__time">{{ commentCreateTime }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'HighPost',
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
  computed: {
    commentCreateTime() {
      return moment(this.post.createDate).fromNow(true);
    },
  },
};
</script>

<style
    lang="stylus"
    scoped
>
    .high
        display flex
        justify-content space-between
        height 60px
    .high__left
        display flex
        align-items center
    .high__avatar-box
        display flex
        align-items: center
        width 58px
        height 58px
        justify-content center
    .high__avatar
        background center center/cover no-repeat grey
        height 36px
        width 36px
        border-radius 50%
        cursor pointer
    .high__title-box
        display flex
        flex-direction column
    .high__title
        font-family "Arial", Arial, sans-serif
        font-size 17px
        font-weight Normal
        letter-spacing -0.4pt
        line-height 22px
        cursor pointer
    .high__sub-title
        font-size 13px
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.1pt
        color rgb(153 153 153)
        line-height 18px
        cursor pointer
    .high__right
        width 96px
        display flex
        align-items right
        justify-content flex-end
    .high__time
        font-family "Arial", Arial, sans-serif
        font-size 13px
        padding 21px 16px 0 0
        color rgb(153 153 153)
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
</style>
