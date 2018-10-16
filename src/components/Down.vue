<template>
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
      <div class="down__comments">
        {{ post.comments.length }} {{ post.comments.length > 1 ? 'comments' : 'comment' }}
      </div>
    </div>
    <div class="down__right">
      <div class="down__like">
        <template v-if="post.likes.length">
          {{ post.likes.length }}
        </template>
        <i class="far fa-heart"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Down',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
    .down {
        display: flex;
        justify-content: space-between;
        height: 44px;
    }
    .down__left {
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
    .down__avatars {
        display: flex;
        flex:auto;
        flex-direction: row;
        align-items: center;
        width: 44px;
        justify-content: center;
    }
    .avatar {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        background: center center/cover no-repeat grey;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid white;
    }
    .avatar:not(:first-child){
        margin-left: -10px;
    }
    .down__comments {
        padding-left: 5pt;
        color: rgb(153, 153, 153);
        font-family: "Arial", Arial, sans-serif;
        letter-spacing: -0.2px;
        font-size: 15px;
    }
    .down__right {
        display: flex;
        padding-top: 13px;
        padding-right: 11px;
    }
    .down__like {
        color: rgb(162 55 243);
        align-items: center;
        font-family: "Arial", Arial, sans-serif;
        letter-spacing: -0.2px;
        font-size: 18px;
    }
    .fa-heart {
        color: rgb(162 55 243);
        font-size: 20px;
    }
</style>
