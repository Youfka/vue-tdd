import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Modal: false,
  },
  getters: {
    modal: ({ Modal }) => Modal,
  },
  mutations: {
    SET_MODAL(state, value) {
      state.Modal = value;
    }
  },
  actions: {

  },
});
