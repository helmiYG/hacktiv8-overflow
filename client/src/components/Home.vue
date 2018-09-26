<template>
    <div class="jumbotron">
        <h1 class="display-4">Welcome to the biggest web forum in the world </h1>
        <p class="lead">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</p>
        <hr class="my-4">
        <p>Find Your Way</p>
    </div>
</template>

<script>
import firebase from 'firebase'
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            photo: '',
            userId: '',
            name: '',
            email: '',
            user: {}
        }
    },
    methods: {
        ...mapActions([
            'loginGoogle'
        ])
    },
    created() { 
        this.user = firebase.auth().currentUser; 
        if(this.user) { 
            this.name = this.user.displayName; 
            this.email = this.user.email; 
            this.photo = this.user.photoURL; 
            this.userId = this.user.uid; 
        } 
        let obj = {
            email: this.email,
            name: this.name
        }
        this.loginGoogle(obj)
    },
}
</script>

<style>

</style>
