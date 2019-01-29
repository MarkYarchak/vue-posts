import { SET_COMMENT, SET_ANSWER } from './mutations-types';

export default {
  [SET_COMMENT](state, comment) {
    this.state.comment = comment;
  },
  [SET_ANSWER](state, answer) {
    this.state.answer = answer;
  },
};
