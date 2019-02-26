<template>
  <div class="one-comment_plus_comment-answers">
    <div class="onecom">
      <div
        class="onecom__left left"
        @click.stop="showParameters"
      >
        <div class="left__avatar">
          <div
            :style="{'background-image': `url(${ comment.author.avatar })`}"
            class="avatar"
          >
            {{ comment.author.avatar === '' ? comment.author.avatar =
            'https://kiittnp.in/ea19b38134d463acc8c7b66744a481847ab4b/assets/img/user.png' : '' }}
          </div>
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
          <div class="userbox__box-comment_date box-comment_date">
            <div class="box-comment_date__commentdate">
              {{ commentCreateTime }}
            </div>
            <div
              v-if="comment.editing"
              class="box-comment_date__true-edit">
              ● edited
            </div>
          </div>
          <CommentItems
            v-if="showCommentItems && !awesomeOperations.editCom && !awesomeOperations.editAns"
            :comment="comment"
            :post="post"
          />
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
            @click="SwitchCommentLike">
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
    <div class="comment-answers">
      <CommentAnswers
        v-if="commentAnswers"
        :comment="comment"
        :post="post"
        :answers="comment.answers"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import CommentItems from './CommentItems';
import CommentAnswers from './CommentAnswers';

export default {
  name: 'OneComment',
  components: {
    CommentItems,
    CommentAnswers,
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
  },
  data() {
    return {
      showCommentAnswers: false,
      openParameters: null,
      showCommentItems: false,
      likePos: false,
    };
  },
  computed: {
    ...mapGetters([
      'posts',
      'user',
      'awesomeOperations',
    ]),
    commentCreateTime() {
      return moment(this.comment.createDate).fromNow(true);
    },
  },
  mounted() {
    window.addEventListener('click', this.closeCommentParameters);
  },
  destroed() {
    window.removeEventListener('click', this.closeCommentParameters);
  },
  methods: {
    createCommentAnswer() {},
    commentAnswers() {
      if (this.comment.answers.length) {
        this.showCommentAnswers = !this.showCommentAnswers;
      }
    },
    closeCommentParameters() {
      this.showCommentItems = false;
    },
    showParameters() {
      // this.showCommentItems = true || false;
      this.showCommentItems = !this.showCommentItems;
    },
    SwitchCommentLike() {
      this.comment.id = Math.floor(Math.random() * 10000);
      this.likePos = !this.likePos;
      if (this.likePos) {
        this.likeComment({
          user: this.user,
          commentId: this.comment.id,
          postId: this.post.id,
        });
      }
      if (!this.likePos) {
        this.dislikeComment({
          user: this.user,
          commentId: this.comment.id,
          postId: this.post.id,
        });
      }
    },
    likeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempComments[commentidx].likes.push(likeData.user);
      }
    },
    dislikeComment(likeData) {
      const tempPosts = this.posts.concat();
      const postidx = tempPosts.findIndex(p => p.id === likeData.postId);
      const tempComments = tempPosts[postidx].comments.concat();
      const commentidx = tempComments.findIndex(c => c.id === likeData.commentId);
      if (postidx !== -1 && commentidx !== -1) {
        tempComments[commentidx].likes = tempComments[commentidx].likes
          .filter(l => l.id !== likeData.user.id);
      }
    },
  },
};
</script>

<style scoped
       lang="stylus"
>
    .one-comment_plus_comment-answers
        display flex
        flex-direction column
    .onecom
        display flex
        margin-top 5px
    .onecom__left
        display flex
    .left__avatar
        align-self flex-start
        padding 5px
    .avatar
        background center center/cover no-repeat grey
        height 27px
        width 27px
        border-radius 50%
        padding 2px
    .left__userbox
        display flex
        flex-direction column
        border-radius 5px
        background-color white
        box-shadow 0 1px 2px 0 rgba(0 0 0 0.18),
        0 1px 2px 0 rgba(0 0 0 0.04), 0 1px 3px 2px rgba(0 0 0 0.04)
    .left__userbox:active
        background-color #ebebeb
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
        max-width 255.2px
        font-family "Arial", Arial, sans-serif
        color rgb(0 0 0)
        font-size 15px
        line-height 15px
        letter-spacing -0.2px
        word-wrap break-word
    .userbox__box-comment_date
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        justify-content center
        display flex
        font-size 12px
        padding 0 3px 2px 3px
    .box-comment_date__commentdate
        color #636363
        padding-bottom 1px
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
    .box-comment_date__true-edit
        margin 0 0 0 5px
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
