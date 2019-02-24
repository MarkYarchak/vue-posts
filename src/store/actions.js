import { SET_COMMENT, INPUT_ACTION } from './mutations-types';

export default {
  updateCommentOrAnswer(context, payload) {
    context.commit(SET_COMMENT, payload);
  },
  setInputAction(context, payload) {
    context.commit(INPUT_ACTION, payload);
  },
};
