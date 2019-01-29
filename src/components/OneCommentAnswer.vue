<template>
  <div class="one-comment-answer">
    <div class="onecom">
      <div
        class="onecom__left left"
        @click.stop="showParameters"
      >
        <div class="left__avatar">
          <div
            :style="{'background-image': `url(${ answer.author.avatar })`}"
            class="avatar"
          />
        </div>
        <div class="left__userbox userbox">
          <div class="userbox__comment comment">
            <div class="comment__username">
              {{ answer.author.username }}
            </div>
            <div class="comment__usercom">
              {{ answer.comment }}
            </div>
          </div>
          <div class="userbox__box-answer_date box-answer_date">
            <div class="box-answer_date__commentdate">
              {{ commentCreateTime }}
            </div>
          </div>
          <CommentAnswerItems
            v-if="showCommentAnswerItems"
            :comment="comment"
            :answer="answer"
            :post="post"
          />
          <!--@edit-comment="editCommentAnswer"-->
        </div>
      </div>
      <div class="onecom__right right">
        <div class="right__like like">
          <div
            v-if="answer.likes.length"
            class="like__count"
          >
            {{ answer.likes.length }}
          </div>
          <div
            class="like__position"
            @click="switchLikeComment">
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
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import CommentAnswerItems from './CommentAnswerItems';

export default {
  name: 'OneCommentAnswer',
  components: {
    CommentAnswerItems,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    comment: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showCommentAnswerItems: false,
      posts: [],
      likePos: false,
      user: {
        displayName: 'Mark Yarchak',
        username: 'markyarchak',
        avatar: 'http://www.austinhealthydentist.com/wp-content/uploads/2016/01/istock-649754038-guy-smiling-web.jpg',
        id: 777,
      },
    };
  },
  computed: {
    commentCreateTime() {
      return moment(this.answer.createDate).fromNow(true);
    },
    ...mapGetters({
      postsFromStore: 'posts',
    }),
  },
  mounted() {
    window.addEventListener('click', this.closeCommentAnswerParameters);
  },
  destroed() {
    window.removeEventListener('click', this.closeCommentAnswerParameters);
  },
  created() {
    this.posts = this.postsFromStore;
  },
  // ор про чай, поняв, що ти муся, я кака і бєка і хто тільки) любиш котів 7 липня 9:43 вечора
  methods: {
    closeCommentAnswerParameters() {
      this.showCommentAnswerItems = false;
    },
    switchLikeComment() {
      this.answer.id = Math.floor(Math.random() * 10000);
      this.likePos = !this.likePos;
      if (this.likePos) {
        this.likeComment();
      }
      if (!this.likePos) {
        this.dislikeComment();
      }
    },
    likeComment() {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === this.post.id);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === this.comment.id);
      const tempAnswers = tempComments[commentidx].answers.concat();
      const answeridx = tempAnswers.findIndex(a => a.id === this.answer.id);
      if (postidx !== -1 && commentidx !== -1 && answeridx !== -1) {
        tempAnswers[answeridx].likes.push(this.user);
      }
    },
    dislikeComment() {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === this.post.id);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === this.comment.id);
      const tempAnswers = tempComments[commentidx].answers.concat();
      const answeridx = tempAnswers.findIndex(a => a.id === this.answer.id);
      if (postidx !== -1 && commentidx !== -1 && answeridx !== -1) {
        tempAnswers[answeridx].likes = tempAnswers[answeridx].likes
          .filter(l => l.id !== this.user.id);
      }
    },
    showParameters() {
      // this.showCommentItems = true || false;
      this.showCommentAnswerItems = !this.showCommentAnswerItems;
    },
  },
};
</script>

<style
   lang="stylus"
   scoped>
  .comment-answers
      cursor pointer
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
      max-width 275.2px
      font-family "Arial", Arial, sans-serif
      color rgb(0 0 0)
      font-size 15px
      line-height 15px
      letter-spacing -0.2px
      word-wrap break-word
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
