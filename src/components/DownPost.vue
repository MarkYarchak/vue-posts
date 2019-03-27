<template>
  <div class="downpluscom">
    <div class="down">
      <div class="down__left">
        <div class="down__avatars-box">
          <div
            v-if="post.comments.length !== 0"
            class="down__avatars"
          >
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
          @click="showCom">
          {{ post.comments.length }} {{ post.comments.length !== 1 ? 'comments' : 'comment' }}
        </div>
      </div>
      <div class="down__right right">
        <div class="right__like like">
          <div v-if="post.likes.length">
            {{ post.likes.length }}
          </div>
          <div
            class="like__position"
            @click="PostLike">
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
    <PostComments
      v-if="showComments"
      :comments="post.comments"
      :post="post"
    />
    <AddComment
      v-if="showComments"
      :post="post"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PostComments from './PostComments';
import AddComment from './AddComment';


export default {
  name: 'DownPost',
  components: {
    PostComments,
    AddComment,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showComments: false,
      likePos: false,
    };
  },
  computed: {
    // filteredComments() {
    //   for (let a = 0; this.post.comments; a) {
    //     const firstAvatar = a.author.avatar;
    //     const tempComments = this.post.comments.concat();
    //     const commentidx = tempComments.findIndex(c => c.author.avatar === firstAvatar);
    //     if (commentidx !== -1) {
    //       var filteredComments = tempComments.filter(c => c.author.avatar !== commentidx);
    //     }
    //   }
    //   return filteredComments;
    // },
    ...mapGetters([
      'posts',
      'user',
    ]),
  },
  methods: {
    showCom() {
      this.showComments = !this.showComments;
    },
    PostLike() {
      this.post.id = Math.floor(Math.random() * 10000);
      this.likePos = !this.likePos;
      if (this.likePos) {
        const tempPosts = this.posts.concat();
        const idx = tempPosts.findIndex(p => p.id === this.post.id);
        if (idx !== -1) {
          tempPosts[idx].likes.push(this.user);
        }
      }
      if (!this.likePos) {
        const tempPosts = this.posts.concat();
        const idx = tempPosts.findIndex(p => p.id === this.post.id);
        if (idx !== -1) {
          tempPosts[idx].likes = tempPosts[idx].likes
            .filter(l => l.id !== this.user.id);
        }
      }
    },
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
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
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
        height 23px
        width 23px
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
        padding-top 2px
        padding-right 11px
    .right__like
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
</style>
