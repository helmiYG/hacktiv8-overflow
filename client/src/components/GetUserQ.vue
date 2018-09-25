<template>
    <div class="container">
        <div class="card text-left mycard" v-for=" (question, index) in questions " :key="index">
            <h5 class="card-header">{{ question.createdAt | moment("dddd, MMMM Do YYYY") }}</h5>
            <div class="card-body">
                <h5 class="card-title">  {{question.title}} <hr></h5>
                <p class="card-text" v-html="question.description"></p>
                <footer class="blockquote-footer"> {{question.userId.name}} <cite title="Source Title"> {{question.userId.email}} </cite></footer>
                <br>
                <div>
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
                </div>
                <br>
                <router-link :to="`/myquestions/${question._id}`"> <button class="btn btn-primary btn-sm"> Read More &rarr; </button> </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapActions} from 'vuex'
export default {
    data () {
        return {
            questions: []
        }
    },
    computed: {
        ...mapState([
            'base_url',
            'newQ'
        ])
    },
    methods: {
        ...mapActions([
           'upvoteQs',
           'downVoteQs',
           'deleteQ'
        ]),
        getUserQ () {
            axios({
                method: 'GET',
                url: this.base_url+'/questions/myquestions',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then((result) => {
                this.questions = result.data
                
            }).catch((err) => {
                console.log(err);
                
            });
        },

        upvoteQsCp(id) {
            this.upvoteQs(id);
        },

        downvoteQsCp (id) {
            this.downVoteQs(id)
        },

        removeQ (id) {
            this.deleteQ(id)
        }
    },
    created() {
        this.getUserQ()
    },
    watch: {
        newQ () {
            this.getUserQ()
        }
    }
}
</script>

<style>
.mycard{
    margin: 10px
}
</style>
