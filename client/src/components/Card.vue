<template>
<div>
    <div class="card text-left" v-for=" (question, index) in questions " :key="index">
        <h5 class="card-header"> {{ question.createdAt | moment("dddd, MMMM Do YYYY") }}</h5>
        <div class="card-body">
            <h5 class="card-title"> {{question.title}} </h5>
            <p class="card-text" v-html="question.description"> {{question.description}} </p>
            <footer class="blockquote-footer"> {{question.userId.name}} <cite title="Source Title"> {{question.userId.email}} </cite></footer>
            <br>
            <div v-if="token">
                <button type="button" class="btn btn-outline-dark btn-sm" @click="upvoteQsCp(question._id)"> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="downvoteQsCp(question._id)"> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
            </div>
             <div v-if="!token">
                <button type="button" class="btn btn-outline-dark btn-sm" @click="upvoteQsCp(question._id)" disabled> <i class="fas fa-thumbs-up"> {{question.like.length}} </i> </button>
                <button type="button" class="btn btn-outline-dark btn-sm" @click="downvoteQsCp(question._id)" disabled> <i class="fas fa-thumbs-down"> {{question.dislike.length}}</i> </button>
            </div>
            <br>
            <router-link :to="`/forum/${question._id}`"> <button class="btn btn-primary btn-sm"> Read More &rarr; </button> </router-link>
        </div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      token: false
    };
  },
  computed: {
    ...mapState(
        [
          'questions', 
          'readVote', 
          'isToken',
          'isLogout'
        ]
      )
  },
  methods: {
    ...mapActions(["getQs", "upvoteQs", 'downVoteQs']),

    upvoteQsCp(id) {
      this.upvoteQs(id);
    },

    downvoteQsCp (id) {
        this.downVoteQs(id)
    }
  },
  created() {
    this.getQs();
    let newToken  = localStorage.getItem('token')
    if (newToken) {
      this.token = true
    } else {
      this.token = false
    }
  },
  watch: {
    readVote() {
      this.getQs();
    },

    isToken () {
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
