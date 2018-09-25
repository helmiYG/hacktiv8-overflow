import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
let url = 'http://localhost:3000'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    msgReg: '',
    regErr: '',
    loginErr: '',
    loginErrVal: '',
    isToken: '',
    isLogout: false,
    questions: [],
    readVote: '',
    readVoteAs: '',
    readAnswer: ''
  },
  mutations: {
    SET_MSGREG(state, payload) {
      state.msgReg = payload
    },
    SET_REGERR(state, payload) {
      state.regErr = payload
    },
    SET_LOGINERR(state, payload) {
      state.loginErr = payload
    },
    SET_LOGINERRVAL(state, payload) {
      state.loginErrVal = payload
    },
    SET_ISTOKEN(state, payload) {
      state.isToken = payload
    },
    SET_ISLOGOUT(state, payload) {
      state.isLogout = payload
    },
    SET_QS(state, payload) {
      state.questions = payload
    },
    SET_VOTE(state, payload) {
      state.readVote = payload
    },
    SET_VOTEAS (state, payload) {
      state.readVoteAs = payload
    },
    SET_ANSWER (state, payload) {
      state.readAnswer = payload
    }
  },
  actions: {
    register(context, data) {
      axios({
          method: 'POST',
          url: url + '/users/register',
          data: {
            name: data.name,
            email: data.email,
            password: data.password
          }
        })
        .then((result) => {
          context.commit('SET_MSGREG', result.data)
        }).catch((err) => {
          context.commit('SET_REGERR', err);
        });
    },

    login(context, data) {
      axios({
          method: 'POST',
          url: url + '/users/login',
          data: {
            email: data.email,
            password: data.password
          }
        })
        .then((result) => {
          context.commit('SET_ISTOKEN', result)
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('idLogin', result.data.id)
          // this.$router.push('/')
        })
        .catch((err) => {
          console.log('masuk err');

          context.commit('SET_LOGINERR', err)
          context.commit('SET_LOGINERRVAL', err.response.data.msg)
        });
    },

    logout(context) {
      console.log(this.state.isLogout);
      if (this.state.isLogout) {
        context.commit('SET_ISLOGOUT', false)
      } else {
        context.commit('SET_ISLOGOUT', true)
      }
      localStorage.clear()
    },

    getQs(context) {
      axios({
          method: 'GET',
          url: url + '/questions'
        })
        .then((result) => {
          context.commit('SET_QS', result.data)
        }).catch((err) => {
          console.log(err.response);

        });
    },

    upvoteQs(context, data) {
      axios({
          method: 'PUT',
          url: `${url}/questions/${data}/upvote`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((result) => {
          context.commit('SET_VOTE', result)
        }).catch((err) => {
          Swal({
            type: 'error',
            title: err.response.data.msg,
            showConfirmButton: false,
            timer: 1500
          })
        });
    },

    downVoteQs(context, data) {
      axios({
          method: 'PUT',
          url: `${url}/questions/${data}/downvote`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((result) => {
          context.commit('SET_VOTE', result)
        }).catch((err) => {
          Swal({
            type: 'error',
            title: err.response.data.msg,
            showConfirmButton: false,
            timer: 1500
          })
        });
    },

    upvoteAs (context, data) {
      let {questionId, answerId} = data
      axios({
        method: 'PUT',
        url: `${url}/answers/${answerId}/upvote`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          questionId: questionId
        }
      })
      .then((result) => {
        context.commit('SET_VOTEAS', result)
      }).catch((err) => {
        Swal({
          type: 'error',
          title: err.response.data.msg,
          showConfirmButton: false,
          timer: 1500
        })
      })
    },

    downVoteAs (context, data) {
      axios({
        method: 'PUT',
        url: url+'/answers/'+data.answerId+'/downvote',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          questionId: data.questionId
        }
      })
      .then((result) => {
        context.commit('SET_VOTEAS', result)
      }).catch((err) => {
        Swal({
          type: 'error',
          title: err.response.data.msg,
          showConfirmButton: false,
          timer: 1500
        })
      });
    },

    addAnswer (context, data) {
      axios({
        method: 'POST',
        url: url+'/answers',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answer: data.answer,
          questionId: data.questionId
        }
      })
      .then((result) => {
        context.commit('SET_ANSWER', result)
      })
      .catch((err) => {
        Swal({
          type: 'error',
          title: err.response.data.msg,
          showConfirmButton: false,
          timer: 1500
        })
      });

    }
  }
})