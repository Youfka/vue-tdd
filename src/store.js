import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Modal: false,
    heroes: []
  },
  getters: {
    modal: ({ Modal }) => Modal,
    heroes: ({ heroes }) => heroes,
  },
  mutations: {
    SET_MODAL(state, value) {
      state.Modal = value;
    },
    SET_HEROES(state,value){
      state.heroes = value;
    },
    ADD_NEW_HERO(state, value) {
      state.heroes.push(value);
    },
    EDIT_HERO(state, value){
      let {id, hero} = value;
      state.heroes[id] = hero;
    }
  },
  actions: {

  },
});
