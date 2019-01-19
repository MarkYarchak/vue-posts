<template>
  <div class="one-comment-answer"></div>
</template>

<script>
export default {
  name: 'OneCommentAnswer',
};
</script>

<style
   lang="stylus"
   scoped>
    .onecom
        display flex
        margin-bottom 5px
    .onecom__left
        display flex
    .left__avatar
        align-self flex-start
        padding 5px
    .avatar
        background center center/cover no-repeat grey
        height 25px
        width 25px
        border-radius 50%
        padding 2px
        border 1px solid rgb(162 55 243)
    .left__userbox
        display flex
        flex-direction column
        border-radius 5px
        background-color WhiteSmoke
    .userbox__comment
        font-family "Arial", Arial, sans-serif
        align-self stretch
        flex-shrink 0
        display flex
        flex-direction column
        border-radius 5px
        padding 5px 8px 5px 8px
    .comment__username
        letter-spacing -0.2px
        font-size 15px
        align-self flex-start
        font-weight 600
    .comment__usercom
        font-family "Arial", Arial, sans-serif
        color rgb(0 0 0)
        font-size 15px
        line-height 15px
        letter-spacing -0.2px
    .userbox__box-answer_date
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        justify-content center
        display flex
        font-size 12px
    .box-answer_date__commentdate
        font-family "Arial", Arial, sans-serif
        color #636363
        padding-bottom 1px
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
    .box-answer_date__answer
    .onecom__right
        margin 0 5px 0 3px
        display flex
        align-items center
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
    .right__like
        display flex
        color rgb(162 55 243)
        align-items center
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        font-size 13px
    .like__position
        padding 0 3px 0 3px
</style>
