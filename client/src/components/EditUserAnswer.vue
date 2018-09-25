<template>
     <div>
        <h1>Update Your Answer</h1>
        <form>
            <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="newAnswer"></textarea>
        </form>
        <button type="button" class="btn btn-success btn-sm" @click="updateAs">Submit</button>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    data () {
        return {
            newAnswer: '',
            idQ: '',
            idA: ''
        }
    },
     computed: {
        ...mapState([
            'base_url',
            'isLogout'
        ])
    },
    methods: {
        getOneAs () {
            axios({
                method: 'GET',
                url: `${this.base_url}/answers/${this.idQ}/edit/${this.idA}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.newAnswer = result.data.answer
                
            }).catch((err) => {
                console.log(err);
            });
        },
        updateAs () {
            axios({
               method: 'PUT',
               url: `${this.base_url}/answers/${this.idA}`,
                headers: {
                    token: localStorage.getItem('token')
                },
               data: {
                   questionId: this.idQ,
                   answer: this.newAnswer
               },
           }) 
           .then(() => {
               this.$router.push(`/myquestions/${this.idQ}`)
           }).catch((err) => {
               console.log(err.response);
               
           });
        }
    },
    created() {
        this.idQ = this.$route.params.id
        this.idA = this.$route.params.idanswer
        this.getOneAs()
    },
      watch: {
        isLogout () {
             this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>
