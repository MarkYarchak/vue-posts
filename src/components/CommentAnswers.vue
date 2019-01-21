<template>
  <div class="comment_answers">
    <!--<div class="free-place"/>-->
    <!--<div class="smth" @click="adbfkjadjfk">Show more</div>-->
    <div
      v-for="(answer, index) in answers"
      v-if="index < countans && openAnswersList"
      :key="index"
      class="showans">
      <OneCommentAnswer
        :answer="answer"
        :post="post"
        :comment="comment"
        class="comment_one-answer"
      />
    </div>
    <div
      v-if="answers.length"
      class="switch-commentanswers"
      @click="showAnswers">
      <span class="anscomment-text">Show {{ 10 > answers.length ? answers.length : 10 }}
        {{ answers.length === 1 ? "answer" : "answers" }}</span>
    </div>
    <!--<div class="open-commentanswers"></div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OneCommentAnswer from './OneCommentAnswer';

export default {
  name: 'CommentAnswers',
  components: {
    OneCommentAnswer,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    answers: {
      type: Array,
      default: () => [],
    },
    comment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      comAnsSwitch: document.body.getElementsByTagName('span'),
      openAnswersList: false,
      posts: [],
      countans: 10,
    };
  },
  computed: {
    ...mapGetters({
      postsFromStore: 'posts',
    }),
  },
  created() {
    this.posts = this.postsFromStore;
  },
  mounted() {
    window.addEventListener('click', this.nothing);
  },
  destroed() {
    window.removeEventListener('click', this.nothing);
  },
  methods: {
    nothing() {
      // const tempPosts = this.posts.concat();
      // const postidx = tempPosts.findIndex(p => p.id === 19);
      // const tempComments = tempPosts[postidx].comments.concat();
      // const commentidx = tempComments.findIndex(c => c.id === 4);
      // const ans = tempComments[commentidx].answers;
      // console.log('rfjgw', tempPosts[0].comments[3].answers);
    },
    showAnswers() {
      this.openAnswersList = !this.openAnswersList;
      if (this.openAnswersList === true) {
        this.comAnsSwitch.style.backgroundColor = 'red';
      } else this.comAnsSwitch.style.backgroundColor = '#7fff6a';
    },
    adbfkjadjfk() {
      this.countans += 1;
    },
  },
};
</script>

<style scoped
        lang="stylus"
>
    .comment_answers
        display flex
        flex-direction column
        /*align-items flex-end*/
  /*.free-place*/
      /*display flex*/
      /*justify-content center*/
    .comment_one-answer
        border-left 4px solid #A3A3AC
        margin-left 42px
    .switch-commentanswers
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
        cursor pointer
    .anscomment-text
        font-family "Arial", Arial, sans-serif
        font-size 14px
        background linear-gradient(to right, #dbdbdb, white)
        color linear-gradient(to right, white, #dbdbdb)
        padding 5px
        margin-left 42px
        border-radius 0 0 0 7px
</style>
