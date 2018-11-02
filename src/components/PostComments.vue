<template>
  <div class="comments">
    <div
      v-for="(comment, index) in comments"
      v-if="index < countcom"
      :key="index"
      class="showcom">
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
          <div class="right__like">
            <div v-if="comment.likes.length">
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
    </div>
    <div class="box-show-morecom">
      <div
        class="show-morecom"
        @click="showMore"
      >Show more</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComments',
  props: {
    comments: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      countcom: 2,
      likePos: false,
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
  .onecom
      display flex
      justify-content space-between
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
      background-color #e3e7f8
  .userbox__comment
      font-family "Arial", Arial, sans-serif
      align-self stretch
      flex-shrink 0
      display flex
      flex-direction column
      border-radius 5px
      background-color #d8e6ff
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
      justify-content center
      display flex
  .box-answer_date__commentdate
      color #848ef3
      font-family "Arial", Arial, sans-serif
  .box-answer_date__answer
      color #585858
  .onecom__right
  .right__like
      display flex
      color rgb(162 55 243)
      align-items center
      font-family "Arial", Arial, sans-serif
      letter-spacing -0.2px
      font-size 12px
  .box-show-morecom
      display flex
      justify-content center
      margin 3px
  .show-morecom
      font-size 16px
      font-family "Arial", Arial, sans-serif
      height 16px
      width 85px
      cursor pointer
      padding 2px
</style>
