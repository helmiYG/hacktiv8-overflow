<template>
      <div>
          <h1>Detail Question</h1>
        <div class="card text-left">
            <h5 class="card-header">{{ question.createdAt | moment("dddd, MMMM Do YYYY") }}</h5>
            <div class="card-body">
                <h5 class="card-title"> {{question.title}} </h5>
                <p class="card-text" v-html="question.description"> {{question.description}} </p>
                <footer class="blockquote-footer"> {{question.userId.name}} <cite title="Source Title"> {{question.userId.email}} </cite></footer>
                <div v-if="token">
                    <button type="button" class="btn btn-outline-dark btn-sm" v-if="token" @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                    <button type="button" class="btn btn-outline-dark btn-sm" v-if="token" @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
                </div>
                 <div v-if="!token">
                    <button type="button" class="btn btn-outline-dark btn-sm" disabled @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                    <button type="button" class="btn btn-outline-dark btn-sm" disabled @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
                </div>
            </div>
            <div class="card-footer">
                <router-link :to="`/myquestions/${question._id}/edit`">
                    <button class="btn btn-sm">
                        <i class="fas fa-edit"></i>
                    </button >
                </router-link>
                <router-link to="/myquestions"></router-link>
                <button class="btn btn-sm" @click="removeQ(question._id)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        <br>
          <router-link to="/myquestions"> <button type="button" class="btn btn-primary btn-sm"> back <i class="fas fa-chevron-left"></i></button></router-link>
        <br>
        <div class="media text-left list-answer" v-for="(answer, index) in answers" :key="index">
            <img class="align-self-start mr-3" src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-7-512.png" style="height: 30px" alt="Generic placeholder image">
            <div class="media-body">
                <h5 class="mt-0"> {{answer.userId.name}} </h5>
                <p> {{answer.answer}}  
                    <router-link :to="`/myquestions/${question._id}/edit/${answer._id}/answer`">
                        <button type="button" class="btn btn-success btn-sm" v-if="token && String(answer.userId._id) == String(userLogin)">
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
import {mapState, mapActions} from 'vuex'
export default {
    data () {
        return {
            question: '',
            answers: [],
            token: false,
            userLogin: '',
            newAnswer: ''
        }
    },
    computed: {
        ...mapState([
            'base_url',
            'readVote',
            'readVoteAs',
            'isToken',
            'readAnswer',
            'newQ',
            'isLogout'
        ])
    },
    methods: {
        ...mapActions([
            'upvoteQs',
            'downVoteQs',
            'upvoteAs',
            'downVoteAs',
            'addAnswer',
            'deleteQ'
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
                url: `${this.base_url}/questions/${this.idQs}`
            })
            .then((result) => {
                this.question = result.data
                this.getAsQs()
            }).catch((err) => {
                console.log(err);

            });
        },

        getAsQs () {
            axios({
                method: 'GET',
                url: `${this.base_url}/answers/${this.idQs}`,
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
            this.userLogin = localStorage.getItem('idLogin')
        },

        removeQ (id) {
            this.deleteQ(id)
        }
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

        this.userLogin = localStorage.getItem('idLogin')
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

        newQ () {
            this.$router.push('/myquestions')
        },
        isLogout () {
            this.$router.push('/login')
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
