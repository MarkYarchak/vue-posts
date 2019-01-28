import { SET_COMMENT } from './mutations-types';

export default {
  updateComment(context, payload) {
    context.commit(SET_COMMENT, payload);
    // console.log(payload);
  },
};
