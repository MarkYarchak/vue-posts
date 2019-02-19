import { SET_COMMENT } from './mutations-types';

export default {
  [SET_COMMENT](state, comment) {
    this.state.answerOrComment = comment;
  },
};
