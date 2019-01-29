import { SET_COMMENT, SET_ANSWER } from './mutations-types';

export default {
  updateComment(context, payload) {
    context.commit(SET_COMMENT, payload);
  },
  updateAnswer(context, payload) {
    context.commit(SET_ANSWER, payload);
  },
};
