export default {
  createComment(state, selfComment) {
    const tempPosts = state.posts;
    const idx = tempPosts.findIndex(p => p.id === selfComment.postId);
    if (idx !== -1) {
      tempPosts[idx].comments.unshift(selfComment);// or push() it to end
      this.posts = JSON.parse(JSON.stringify(tempPosts));
    }
  },
  givePostComments: (state, payload) => {
    state.comments = payload;
  },
  giveOnePost(state, payload) {
    state.onepost = payload;
  },
};
