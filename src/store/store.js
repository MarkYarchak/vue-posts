import Vue from 'vue';
import Vuex from 'vuex';
// import VuexPersist from 'vuex-persist';
import createPersistedState from 'vuex-persistedstate';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);
// const vuexPersist = new VuexPersist({
//   key: 'my-app',
//   storage: localStorage,
// });

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  // plugins: [vuexPersist.plugin],
  plugins: [createPersistedState()],
});
