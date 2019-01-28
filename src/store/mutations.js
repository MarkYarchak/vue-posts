import { SET_COMMENT } from './mutations-types';

export default {
  [SET_COMMENT](state, comment) {
    this.state.comment = comment;
  },
  // givePostComments: (state, payload) => {
  //   state.comments = payload;
  // },
  // giveOnePost(state, payload) {
  //   state.onepost = payload;
  // },
};
