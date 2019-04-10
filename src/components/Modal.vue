<template>
    <md-dialog :md-active.sync="modal">
        <form novalidate class="md-layout" @submit.prevent="">
            <div class="field md-title p-top md-layout-item md-size-90">{{title}}</div>
            <template v-if="type!='delete'">
                <md-field class="field">
                    <label>Name</label> {{hero_id}}
                    <md-input :value="hero.name" data-test="name" @change="getName($event)"></md-input>
                </md-field>   
                <md-field class="field">
                    <label>Surname</label>
                    <md-input :value="hero.surname" data-test="surname" @change="getSurname($event)"></md-input>
                </md-field>  
                <md-field class="field">
                    <label>Pseudonym</label>
                    <md-input :value="hero.pseudo" data-test="pseudo" @change="getPseudo($event)"></md-input>
                </md-field>
            </template>
            <md-dialog-actions class="p-top">
                <md-button type="submit" class="md-primary" @click="save()">OK</md-button>
                <md-button class="md-primary" @click="setActive(false)">Cancel</md-button>
            </md-dialog-actions>
        </form>
    </md-dialog>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
      newHero: {
          name: '',
          surname: '',
          pseudo: ''
      }
    }),
    props: {
        type: {
            type: String,
        },
        hero: {
            type: Object
        },
        hero_id: {
            type: Number
        }
    },
    computed: {
        modal () {
            return this.$store.state.Modal;
        },
        messageClass () {
            return {
                'md-invalid': this.hasMessages
            }
        },
        title(){
            if(this.type=='edit'){
                return `Edit ${this.hero.pseudo}`
            } else if(this.type=='delete'){
                return `Are you sure you want to delete ${this.hero.pseudo}?`
            } else return 'Add new hero!';
        },
    },
    methods: {
        setActive(active) {
            this.$store.commit('SET_MODAL', active);
        },
        getName(ev){
            this.newHero.name = ev.target.value;
        },
        getSurname(ev){
            this.newHero.surname = ev.target.value;
        },
        getPseudo(ev){
            this.newHero.pseudo = ev.target.value;
        },
        save(){
            this.setActive(false);
            if(this.type=='add'){
                axios.post('http://localhost:3000/heroes/add', this.newHero)
                .then((response) => {
                    this.$store.commit('ADD_NEW_HERO',  this.newHero);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            } else if(this.type=='edit') {
                let obj = {
                    id: this.hero_id,
                    hero: this.newHero,
                }
                axios.post('http://localhost:3000/heroes/'+this.hero_id, this.hero_id)
                .then((response) => {
                    this.$store.commit('EDIT_HERO',  obj);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.p-top {
    padding-top: 20px;
}
.field {
    margin: 5px 24px;
    padding-left: 0;
}
</style>
