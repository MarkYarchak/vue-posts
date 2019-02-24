import { SET_COMMENT, INPUT_ACTION } from './mutations-types';

export default {
  [SET_COMMENT](state, comment) {
    this.state.answerOrComment = comment;
  },
  [INPUT_ACTION](state, string) {
    this.state.inputAction = string;
  },
};
