<template>
    <md-dialog :md-active.sync="modal">
        <form novalidate class="md-layout" @submit.prevent="">
            <div class="field md-title p-top md-layout-item md-size-90">{{title}}</div>
            <template v-if="type!='delete'">
                <md-field class="field">
                    <label>Name</label>
                    <md-input :value="hero.name" data-test="name"></md-input>
                </md-field>   
                <md-field class="field">
                    <label>Surname</label>
                    <md-input :value="hero.surname" data-test="surname"></md-input>
                </md-field>  
                <md-field :class="messageClass" class="field">
                    <label>Pseudo</label>
                    <md-input :value="hero.pseudo" data-test="pseudo"></md-input>
                    <span class="md-error">There is an error</span>
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
      name: null,
      surname: null,
      required: null,
      hasMessages: false
    }),
    props: {
        type: {
            type: String,
        },
        hero: {
            type: Object
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
        save(){
            this.setActive(false);
            let str = {"name":"Bruce","surname":"Benner","pseudo":"Hulk"};
            if(this.type=='add'){
            axios.post('http://localhost:3000/heroes/add', str)
            .then((response) => {
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
