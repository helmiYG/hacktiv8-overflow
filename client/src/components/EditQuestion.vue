<template>
    <div class="container form-add">
        <h1>Edit Question</h1>
        <table class="table">
            <tr>
                <th>Title</th>
                <td><input type="text" name="title" id="title" v-model="title" class="form-control"></td>
            </tr>
            <tr>
                <th>Description</th>
                <wysiwyg v-model="description" />
            </tr>
        </table>
        <router-link to="/myquestions">
            <button type="submit" class="btn btn-secondary btn-sm">Cancel</button>
        </router-link>
        <button type="submit" class="btn btn-success btn-sm" @click="editQuestion">Submit</button>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import axios from 'axios';
export default {
    data () {
        return {
            title: '',
            description: '',
            idQ: ''
        }
    },
    computed: {
        ...mapState([
            'base_url',
            'isLogout'
        ])
    },
    methods: {
        getOneQs () {
            axios({
                method: 'GET',
                url: `${this.base_url}/questions/${this.idQ}`
            })
            .then((result) => {
                this.title = result.data.title
                this.description = result.data.description
            }).catch((err) => {
                console.log(err);
                
            });
        },
        editQuestion () {
            axios({
                method: 'PUT',
                url: `${this.base_url}/questions/${this.idQ}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    title: this.title,
                    description: this.description
                }
            })
            .then(() => {
                this.$router.push(`/myquestions/${this.idQ}`)
            }).catch((err) => {
                console.log(err);
                
            });
        }
    },
    created() {
       this.idQ = this.$route.params.id
        this.getOneQs()
    },

    watch: {
        isLogout () {
             this.$router.push('/login')
        }
    }
}
</script>

<style>
.form-add{
    margin: 20px
}
</style>
