<template>
  <div class="wrap md-layout md-alignment-center-center">
   
      <h1 class="md-display-2 m-title">Superheroes</h1>
      <md-button class="md-fab green" @click="setActive(true, 'add')" data-test="add">
        <md-icon>add</md-icon>
      </md-button>
    <div class="md-layout-item md-size-90">
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Surname</md-table-head>
        <md-table-head>Pseudo</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
      <md-table-row v-for="(hero, i) in heroes" :key="i">
        <md-table-cell md-numeric>{{i+1}}</md-table-cell>
        <md-table-cell>{{hero.name}}</md-table-cell>
        <md-table-cell>{{hero.surname}}</md-table-cell>
        <md-table-cell>{{hero.pseudo}}</md-table-cell>
        <md-table-cell> 
          <md-button class="md-fab md-primary" @click="setActive(true, 'edit', i)" data-test="edit">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-fab md-plain" @click="setActive(true, 'delete', i)" data-test="delete">
            <md-icon>clear</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    </div>
     <Modal :type="modal_type" :hero="hero || {}" ></Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import axios from 'axios';
export default {
  name: 'MainPage',
  components: {
    Modal
  },
  data() {
    return {
      showDialog: false,
      modal: this.$store.getters.modal,
      heroes: [],
      modal_type: '',
      hero: {}
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/heroes')
      .then(response => (this.heroes = response.data))
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    setActive(active, type, id){
        this.hero = this.heroes[id];
        this.modal_type = type;
        this.$store.commit('SET_MODAL', active);
    },
  }
};
</script>

<style lang="scss" scoped>

html, body, .wrap {
  margin: 0;
  padding: 0;
}
.green {
  background-color: #00C853!important;
}
.m-title {
  margin: 20px 10px 30px 0;
}
</style>
