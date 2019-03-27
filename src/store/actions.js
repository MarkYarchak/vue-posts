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
  updateCommentOrAnswer(context, payload) {
    context.commit(SET_COMMENT, payload);
  },
  setInputAction(context, payload) {
    context.commit(INPUT_ACTION, payload);
  },
  createMyComment(context, payload) {
    context.commit(CREATE_COMMENT, payload);
  },
  editMyComment(context, payload) {
    context.commit(EDIT_COMMENT, payload);
  },
  createMyAnswer(context, payload) {
    context.commit(CREATE_ANSWER, payload);
  },
  editMyAnswer(context, payload) {
    context.commit(EDIT_ANSWER, payload);
  },
  myReplyAnswer(context, payload) {
    context.commit(REPLY_ANSWER, payload);
  },
  deleteUserComment(context, payload) {
    context.commit(DELETE_COMMENT, payload);
  },
  deleteUserAnswer(context, payload) {
    context.commit(DELETE_ANSWER, payload);
  },
};
