export default {
  posts: state => state.posts,
  onepost: (state, posts) => id => posts.find(post => post.id === id),
  comments: state => state.comments,
};
