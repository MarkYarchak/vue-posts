export default {
  posts: state => state.posts,
  user: state => state.user,
  inputAction: state => state.answerOrComment.inpAction,
  answerOrComment: state => state.answerOrComment,
  awesomeOperations: state => state.inputAction,
};
