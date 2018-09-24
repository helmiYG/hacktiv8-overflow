<template>
    <div>
        <div class="card text-left">
            <h5 class="card-header">Tanggal</h5>
            <div class="card-body">
                <h5 class="card-title"> {{question.title}} </h5>
                <p class="card-text"> {{question.description}} </p>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
        </div>
        </div>
        <br>
        <div class="media text-left list-answer" v-for="(answer, index) in answers" :key="index">
            <img class="align-self-start mr-3" src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png" style="height: 30px" alt="Generic placeholder image">
            <div class="media-body">
                <h5 class="mt-0"> {{answer.userId.name}} </h5>
                <p> {{answer.answer}} </p>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="upvoteAsCp(answer._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="downvoteAsCp(answer._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from "vuex"
export default {
    data () {
        return {
            url: 'http://localhost:3000',
            question: '',
            idQs: '',
            answers: []
        }
    },
    computed: {
        ...mapState([
            'readVote',
            'readVoteAs'
        ])
    },
    methods: {
        ...mapActions([
            'upvoteQs',
            'downVoteQs',
            'upvoteAs'
        ]),
        upvoteQsCp(id) {
            this.upvoteQs(id);
        },

        downvoteQsCp (id) {
            this.downVoteQs(id)
        },

        getOneQs () {
            axios({
                method: 'GET',
                url: `${this.url}/questions/${this.idQs}`
            })
            .then((result) => {
                this.question = result.data
                console.log('masuk get on q');
                
                this.getAsQs()
            }).catch((err) => {
                console.log(err);

            });
        },

        getAsQs () {
            axios({
                method: 'GET',
                url: `${this.url}/answers/${this.idQs}`,
            })
            .then((result) => {
                console.log('-----',result);
                this.answers = result.data
            }).catch((err) => {
                console.log(err.response);
                
            });
        },

        upvoteAsCp (id) {
            console.log('masuk');
            
            let obj = {
                questionId : this.idQs,
                answerId: id
            }

            this.upvoteAs(obj)
        },

        downvoteAsCp () {

        }

    },
    created() {
        console.log('masuk');
        console.log(this.$route.params.id);
        
        this.idQs = this.$route.params.id
        this.getOneQs()

    },
    watch: {
        readVote () {
          this.getOneQs()
        },

        readVoteAs () {
            this.getAsQs()
        }
    }
}
</script>

<style>
 .list-answer {
    border: solid 1px;
    padding: 10px;
    margin-top: 10px
 }
</style>
