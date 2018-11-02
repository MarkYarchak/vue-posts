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
              <div class="box-answer_date__commentdate">2m</div>
              <div class="box-answer_date__answer">Answer</div>
            </div>
          </div>
        </div>
        <div class="onecom__right"></div>
      </div>
    </div>
    <div
      class="show-morecom"
      @click="showMore"
    >Show more</div>
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
  .onecom__left
      display flex
  .left__avatar
      align-self flex-start
      flex-shrink 0
  .avatar
      background center center/cover no-repeat grey
      height 25px
      width 25px
      border-radius 50%
  .left__userbox
      display flex
      flex-direction column
  .userbox__comment
    font-family "Arial", Arial, sans-serif
    align-self stretch
    flex-shrink 0
    display flex
    flex-direction column
  .comment__username
      letter-spacing -0.2px
      font-size 15px
      align-self flex-start
      font-weight 600
  .comment__usercom
  .userbox__box-answer_date
      display flex
  .box-answer_date__commentdate
      font-family "Arial", Arial, sans-serif
  .box-answer_date__answer
  .show-morecom
       font-family "Arial", Arial, sans-serif
       height 36px
       width 80px
       cursor pointer
       padding 0
</style>
