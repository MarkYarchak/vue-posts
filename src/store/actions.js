import { SET_COMMENT } from './mutations-types';

export default {
  updateCommentOrAnswer(context, payload) {
    context.commit(SET_COMMENT, payload);
  },
};
