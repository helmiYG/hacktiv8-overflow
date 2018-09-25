<template>
    <div class="container form-add">
        <h1>Add Question</h1>
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
        <button type="submit" class="btn btn-success btn-sm" @click="insertQuestion">Submit</button>
    </div>
</template>

<script>

import {mapActions, mapState} from 'vuex'
export default {
    data () {
        return {
            title: '',
            description: '',
        }
    },
    computed: {
        ...mapState([
            'isLogout'
        ])
    },
    methods: {
        ...mapActions([
            'addQuestion'
        ]),
        insertQuestion () {
            let obj = {
                title: this.title,
                description: this.description
            }

            this.addQuestion(obj)
            this.title = ''
            this.description = ''
        }
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
