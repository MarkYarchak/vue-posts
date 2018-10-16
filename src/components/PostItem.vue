<template>
  <div class="post-item">
    <High
      :post="post"
    />
    <Content
      :post="post"
    />
    <Down
      :post="post"
    />
  </div>
</template>

<script>
import High from './High';
import Content from './Content';
import Down from './Down';

export default {
  components: {
    High,
    Content,
    Down,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .post-item {
        width: 343px;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        margin-bottom: 10px;
        background-color: rgba(216, 216, 216, 0);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18),
        0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 2px 6px 0 rgba(0, 0, 0, 0.04);
    }
</style>
