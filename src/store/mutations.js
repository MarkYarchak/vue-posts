import {
  SET_COMMENT,
  INPUT_ACTION,
  CREATE_COMMENT,
  EDIT_COMMENT,
  CREATE_ANSWER,
  EDIT_ANSWER,
  REPLY_ANSWER,
  DELETE_COMMENT,
  DELETE_ANSWER,
} from './mutations-types';

export default {
  [SET_COMMENT](state, comment) {
    this.state.answerOrComment = comment;
  },
  [INPUT_ACTION](state, string) {
    this.state.inputAction = string;
  },
  [CREATE_COMMENT](state, comment) {
    const tempPosts = this.state.posts.concat();
    const idx = tempPosts.findIndex(p => p.id === comment.postId);
    if (idx !== -1) {
      tempPosts[idx].comments.unshift(comment.myComment);// or push() it to end
    }
  },
  [EDIT_COMMENT](state, comment) {
    const tempPosts = this.state.posts.concat();
    const idx = tempPosts.findIndex(p => p.id === comment.postId);
    const tempComments = tempPosts[idx].comments.concat();
    const commentidx = tempComments
      .findIndex(c => c.id === comment.commentId);
    if (tempComments[commentidx].comment !== comment.myComment.comment
        && idx !== -1 && commentidx !== -1) {
      tempComments[commentidx].comment = comment.myComment.comment;
      tempComments[commentidx].editing = true;
    }
  },
  [CREATE_ANSWER](state, answer) {
    const tempPosts = this.state.posts.concat();
    const idx = tempPosts.findIndex(p => p.id === answer.postId);
    const tempComments = tempPosts[idx].comments.concat();
    const commentidx = tempComments
      .findIndex(c => c.id === answer.commentId);
    if (idx !== -1 && commentidx !== -1) {
      tempComments[commentidx].answers.unshift(answer.myAnswer);
    }
  },
  [EDIT_ANSWER](state, answer) {
    const tempPosts = this.state.posts.concat();
    const idx = tempPosts.findIndex(p => p.id === answer.postId);
    const tempComments = tempPosts[idx].comments.concat();
    const commentidx = tempComments
      .findIndex(c => c.id === answer.commentId);
    const tempAnswers = tempComments[commentidx].answers.concat();
    const answeridx = tempAnswers.findIndex(a => a.id === answer.answerId);
    const currentAnswer = tempAnswers[answeridx];
    if (currentAnswer.comment !== answer.myComment.comment
        && idx !== -1 && commentidx !== -1) {
      currentAnswer.comment = answer.myComment.comment;
      currentAnswer.editing = true;
    }
  },
  [REPLY_ANSWER](state, answer) {
    const tempPosts = this.state.posts.concat();
    const idx = tempPosts.findIndex(p => p.id === answer.postId);
    const tempComments = tempPosts[idx].comments.concat();
    const commentidx = tempComments
      .findIndex(c => c.id === answer.commentId);
    if (idx !== -1 && commentidx !== -1) {
      tempComments[commentidx].answers.unshift(answer.myAnswer);
    }
  },
  [DELETE_COMMENT](state, comment) {
    const tempPosts = this.state.posts.concat();
    const postidx = tempPosts.findIndex(p => p.id === comment.postId);
    const tempComments = tempPosts[postidx].comments.concat();
    const commentidx = tempComments.findIndex(c => c.id === comment.commentId);
    if (postidx !== -1 && commentidx !== -1) {
      tempPosts[postidx].comments = tempComments.filter(c => c.id !== comment.commentId);
    }
  },
  [DELETE_ANSWER](state, answer) {
    const tempPosts = this.state.posts.concat();
    const postidx = tempPosts.findIndex(p => p.id === answer.postId);
    const tempComments = tempPosts[postidx].comments.concat();
    const commentidx = tempComments.findIndex(c => c.id === answer.commentId);
    const tempAnswers = tempPosts[postidx].comments[commentidx].answers.concat();
    const answeridx = tempAnswers.findIndex(a => a.id === answer.answerId);
    if (postidx !== -1 && commentidx !== -1 && answeridx !== -1) {
      tempPosts[postidx].comments[commentidx].answers = tempAnswers
        .filter(a => a.id !== answer.answerId);
    }
  },
};
