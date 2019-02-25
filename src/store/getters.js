export default {
  posts: state => state.posts,
  commentOrAnswer: state => state.answerOrComment,
  user: state => state.user,
  inputAction: state => state.answerOrComment.inpAction,
  answerOrComment: state => state.answerOrComment,
};
