<template>
  <div class="downpluscom">
    <div class="down">
      <div class="down__left">
        <div class="down__avatars-box">
          <div class="down__avatars">
            <div
              v-for="(comment, index) in post.comments"
              v-if="index < 3"
              :key="index"
              :style="{'background-image': `url(${ comment.author.avatar })`}"
              class="avatar"
            />
          </div>
        </div>
        <div
          class="down__comments"
          @click="showCom()">
          {{ post.comments.length }} {{ post.comments.length > 1 ? 'comments' : 'comment' }}
        </div>
      </div>
      <div class="down__right">
        <div class="down__like like">
          <div v-if="post.likes.length">
            {{ post.likes.length }}
          </div>
          <div class="like__position" @click="likePos = !likePos">
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
    <template v-if="showComents">
      <div
        v-for="(comment, index) in post.comments"
        v-if="index < countcom"
        :key="index"
        class="showcom">
        <div class="onecom">
          <div class="onecom__comment-box comment-box">
            <div
              :style="{'background-image': `url(${ comment.author.avatar })`}"
              class="comment-box__avatar"
            />
            <div class="comment-box__string-combox string-combox">
              <div class="string-combox__username">
                {{ comment.author.username }}
              </div>
              <div class="string-combox__comment">
                {{ comment.comment }}
              </div>
            </div>
          </div>
          <div class="onecom__like"></div>
        </div>
      </div>
      <div
        class="show-morecom"
        @click="showMore"
      >Show more</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DownPost',

  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      countcom: 2,
      showComents: false,
      likePos: false,
    };
  },
  methods: {
    showCom() {
      this.showComents = !this.showComents;
    },
    showMore() {
      this.countcom += 2;
    },
  },
  computed: {
  },
};
</script>

<style
    lang="stylus"
    scoped
>
    .down
        display flex
        justify-content space-between
        height 44px
    .down__left
        display flex
        align-items center
        padding-left 10px
    .down__avatars
        display flex
        flex auto
        flex-direction row
        align-items center
        width 44px
        justify-content center
    .avatar
        display flex
        flex-shrink 0
        align-items center
        background center center/cover no-repeat grey
        height 20px
        width 20px
        border-radius 50%
        border 2px solid white
    .avatar:not(:first-child)
        margin-left -11px
    .down__comments
        padding-left 5pt
        color rgb(153 153 153)
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        font-size 15px
        cursor pointer
    .down__right
        display: flex
        padding-top 13px
        padding-right 11px
    .down__like
        display flex
        color rgb(162 55 243)
        align-items center
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        font-size 18px
    .fa-heart
        font-size 20px
        cursor pointer
    .like__position
        display flex
        margin-left 5px
    .comentshow
        display flex
        justify-content space-between
        padding-left 5pt
    .onecom
        display flex
        justify-content space-between
        box-shadow 0 1px 2px 0 rgba(0 0 0 0.18),
        0 1px 2px 0 rgba(0 0 0 0.04), 0 2px 6px 0 rgba(0 0 0 0.04)
    .onecom__comment-box
    .comment-box__avatar
        display flex
        flex-shrink 0
        background center center/cover no-repeat grey
        height 36px
        width 36px
        border-radius 50%
    .string-combox
        display flex
        flex-direction column
    .string-combox__username
        font-weight 600
        font-size 15
    .string-combox__comment
        font-family "Arial", Arial, sans-serif
        letter-spacing -0.2px
        font-size 15px
    .show-morecom
        height 36px
        width 36px
        cursor pointer
</style>
