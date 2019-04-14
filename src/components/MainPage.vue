<template>
  <div class="wrap md-layout md-alignment-center-center">
      <h1 class="md-display-2 m-title">Superheroes</h1> 
      <md-button class="md-fab green" @click="setActive(true, 'add')" data-test="add">
        <md-icon>add</md-icon>
      </md-button>
    <div class="md-layout-item md-size-100">
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Surname</md-table-head>
        <md-table-head>Pseudonym</md-table-head>
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
     <Modal :type="modal_type" :hero="current_hero || {}" :hero_id="hero_id || 0"></Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'MainPage',
  components: {
    Modal
  },
  data() {
    return {
      showDialog: false,
      modal: this.$store.getters.modal,
      modal_type: '',
      current_hero: {},
      hero_id: 0
    }
  },
  computed: { 
    ...mapGetters(['heroes']), 
  },
  async mounted() {
    await axios
      .get('http://localhost:3000/heroes')
      .then(response => {
        console.log(response.data);
        this.SET_HEROES(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    ...mapMutations(['SET_HEROES', 'SET_MODAL']), 
    setActive(active, type, id){
        this.current_hero = this.heroes[id];
        this.hero_id = id;
        this.modal_type = type;
        this.SET_MODAL(active);
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
  margin: 20px 10px 30px 10px;
   @media(max-width: 800px){
     margin-bottom: 10px;
   }
}
.md-button+.md-button {
    margin-left: 8px;
}
.wrap {
  padding: 30px;
  @media(max-width: 800px){
    padding: 0 0 30px;
    .md-table {
      margin-top: 20px;
    }
  }
}
</style>
