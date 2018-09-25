<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #2E3246">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">Hacktiv8 Overflow</a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/forum">Forum</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" v-if="token">My Question <span class="sr-only"></span></a>
            </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                 <router-link to="/login"><button class="btn btn-outline-success my-2 my-sm-0" type="button" v-if="!token">Login</button></router-link>
                 <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-if="token" @click="signout">Logout</button>
            </form>
        </div>
    </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data () {
        return {
            token : false
        }
    },
    computed: {
        ...mapState([
            'isToken',
            'isLogout'
        ])
    },
    methods: {
        ...mapActions([
            'logout'
        ]),

        signout () {
            this.logout()
        }
    },
    mounted() {
        let getToken = localStorage.getItem('token')
        if (getToken) {
            this.token = true
        }
    },
    watch: {
        isToken () {
            console.log('masuk navbar is token');
            
            this.token = true
        },

        isLogout () {
            this.token = false
        }
    }
};
</script>

<style>
</style>
