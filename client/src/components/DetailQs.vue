<template>
    <div>
        <div class="card text-left">
            <h5 class="card-header">Tanggal</h5>
            <div class="card-body">
                <h5 class="card-title"> {{question.title}} </h5>
                <p class="card-text"> {{question.description}} </p>
                <div v-if="token">
                    <button type="button" class="btn btn-outline-dark btn-sm" v-if="token" @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                    <button type="button" class="btn btn-outline-dark btn-sm" v-if="token" @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
                </div>
                 <div v-if="!token">
                    <button type="button" class="btn btn-outline-dark btn-sm" disabled @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                    <button type="button" class="btn btn-outline-dark btn-sm" disabled @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
                </div>
            </div>
        </div>
        <br>
          <router-link to="/forum"> <button type="button" class="btn btn-primary btn-sm"> back <i class="fas fa-chevron-left"></i></button></router-link>
        <br>
        <div class="media text-left list-answer" v-for="(answer, index) in answers" :key="index">
            <img class="align-self-start mr-3" src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png" style="height: 30px" alt="Generic placeholder image">
            <div class="media-body">
                <h5 class="mt-0"> {{answer.userId.name}} </h5>
                <p> {{answer.answer}}  
                    <router-link :to="`/forum/${question._id}/edit/${answer._id}/answer`">
                        <button type="button" class="btn btn-success btn-sm" v-if="token">
                            <i class="fas fa-edit"></i>
                        </button> 
                    </router-link> 
                </p>
               
               <div v-if="token">
                <button type="button" class="btn btn-outline-dark btn-sm" @click="upvoteAsCp(answer._id)"> <i class="fas fa-thumbs-up"> {{answer.like.length}} </i> </button>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="downvoteAsCp(answer._id)"> <i class="fas fa-thumbs-down"> {{answer.dislike.length}}</i> </button>
               </div>
                <div v-if="!token">
                <button type="button" class="btn btn-outline-dark btn-sm" disabled @click="upvoteAsCp(answer._id)"> <i class="fas fa-thumbs-up"> {{answer.like.length}} </i> </button>
                <button type="button" class="btn btn-outline-dark btn-sm" disabled @click="downvoteAsCp(answer._id)"> <i class="fas fa-thumbs-down"> {{answer.dislike.length}}</i> </button>
               </div>
            </div>
        </div>
        <br>
       <div v-if="token">
           <label for="answer"> <h2>Answer</h2></label>
           <textarea name="answer" id="" cols="30" rows="10" class="form-control" v-model="newAnswer"></textarea>
           <button class="btn btn-primary btn-sm" style="margin-top:10px" type="button" @click="createAnswer">add answer</button>
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
            answers: [],
            newAnswer: '',
            token: false
        }
    },
    computed: {
        ...mapState([
            'readVote',
            'readVoteAs',
            'readAnswer',
            'isToken',
            'isLogout'
        ])
    },
    methods: {
        ...mapActions([
            'upvoteQs',
            'downVoteQs',
            'upvoteAs',
            'downVoteAs',
            'addAnswer'
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
                this.answers = result.data
            }).catch((err) => {
                console.log(err.response);
                
            });
        },

        upvoteAsCp (id) {
            let obj = {
                questionId : this.idQs,
                answerId: id
            }

            this.upvoteAs(obj)
        },

        downvoteAsCp (id) {
            let obj = {
                questionId : this.idQs,
                answerId: id
            }

            this.downVoteAs(obj)
        },

        createAnswer () {
            let obj = {
                answer: this.newAnswer,
                questionId: this.idQs
            }

            this.addAnswer(obj)
            this.newAnswer = ''
        },



    },
    created() {
        this.idQs = this.$route.params.id
        this.getOneQs()
        let newToken  = localStorage.getItem('token')
        if (newToken) {
            this.token = true
        } else {
            this.token = false
        }
    },
    watch: {
        readVote () {
          this.getOneQs()
        },

        readVoteAs () {
            this.getAsQs()
        },

        readAnswer () {
            this.getAsQs()
        },

        isToken () {
            console.log('masuk watch detail');
            
            this.token = true
        },

        isLogout () {
            this.token = false
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
