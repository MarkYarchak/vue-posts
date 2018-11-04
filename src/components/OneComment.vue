<template>
  <div class="onecom">
    <div class="onecom__left left">
      <div class="left__avatar">
        <div
          :style="{'background-image': `url(${ comment.author.avatar })`}"
          class="avatar"
        />
      </div>
      <div class="left__userbox userbox">
        <div class="userbox__comment comment">
          <div class="comment__username">
            {{ comment.author.username }}
          </div>
          <div class="comment__usercom">
            {{ comment.comment }}
          </div>
        </div>
        <div class="userbox__box-answer_date box-answer_date">
          <div class="box-answer_date__commentdate">
            {{ comment.createDate }}
          </div>
        </div>
      </div>
    </div>
    <div class="onecom__right right">
      <div class="right__like like">
        <div
          v-if="comment.likes.length"
          class="like__count"
        >
          {{ comment.likes.length }}
        </div>
        <div
          class="like__position"
          @click="likePos = !likePos">
          <i
            v-if="!likePos"
            class="far fa-heart"
          />
          <i
            v-if="likePos"
            class="fas fa-heart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OneComment',
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      likePos: false,
    };
  },

};
</script>

<style scoped
       lang="stylus"
>
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
    .box-answer_date__answer
    .onecom__right
        margin 0 5px 0 3px
        display flex
        align-items center
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
