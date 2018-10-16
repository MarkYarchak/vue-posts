<template>
    <div class="high">
      <div class="high__left">
          <div class="high__avatar-box">
            <div class="high__avatar"
                :style="{'background-image': `url(${post.author.avatar})`}"
            ></div>
          </div>
          <div class="high__title-box">
              <div class="high__title">{{ post.author.displayName }}</div>
              <div class="high__sub-title">{{ post.author.username }}</div>
          </div>
      </div>
      <div class="high__right">
          <div class="high__time">{{ post.createDate }}</div>
      </div>
    </div>

    <!-- <div class="derek-post__header header">
        <div class="header__left">
            <div class="header__avatar-box">
                <div class="header__avatar-derek"></div>
            </div>
            <div class="header__title-box">
                <div class="header__title">Derek Russell</div>
                <div class="header__sub-title">@derek.russell </div>
            </div>
        </div>
        <div class="header__right">
            <div class="header__time">
                16m
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
  name: "High",
  props: {
    post: {
      type: Object,
      default:() => ({}),
    },
  },
  data() {
    return  {

    };
  },
}
</script>

<style scoped>
    .high {
        display: flex;
        justify-content: space-between;
        height: 60px;
    }
    .high__left {
        display: flex;
        align-items: center;
    }
    .high__avatar-box{
        display: flex;
        align-items: center;
        width: 58px;
        height: 58px;
        justify-content: center;
    }
    .high__avatar {
        background: center center/cover no-repeat grey;
        height: 36px;
        width: 36px;
        border-radius: 50%;
    }
    .high__title-box {
        display: flex;
        flex-direction: column;
    }
    .high__title {
        font-family: "Arial", Arial, sans-serif;
        font-size: 17px;
        font-weight: Normal;
        letter-spacing: -0.4pt;
        line-height: 22px;
    }
    .high__sub-title {
        font-size: 13px;
        font-family: "Arial", Arial, sans-serif;
        letter-spacing: -0.1pt;
        color: rgb(153, 153, 153);
        line-height: 18px;
    }
    .high__right {
        width: 96px;
        display: flex;
        align-items: right;
        justify-content: flex-end;
    }
    .high__time {
        font-family: "Arial", Arial, sans-serif;
        font-size: 13px;
        padding: 16pt;
        color: rgb(153, 153, 153);
    }
</style>