<template>
<div class="container">

    <div class="row">
        <div class="col-md-6">
            <div class="login">
                <h1>Login</h1>
                 <div v-if="msgLoginStatus && msgLoginErr.length > 0">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong v-for="(msg, index) in msgLoginErr" :key="index"> {{msg}} <br></strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="falseLoginStatus">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="email-login" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailL">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password-login" placeholder="Password" v-model="passwordL">
                </div>
                <button type="button" class="btn btn-success" @click="signin">LOGIN</button>
                <div id="firebaseui-auth-container"></div>
                </form>
            </div>
        </div>
        <div class="col-md-6">
            <h2>Register</h2>
             <div v-if="msgRegStatus">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong> {{msgRegVal}} </strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="falseReg"> 
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div v-if="msgRegErrStatus && msgRegErr.length > 0">
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong v-for="(msg, index) in msgRegErr" :key="index"> {{msg}} <br></strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="shMsErrFalse">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
             <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Name address</label>
                    <input type="text" class="form-control" id="name-register" aria-describedby="emailHelp" placeholder="Enter name" v-model="name">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="email-register" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailR">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="password-register" placeholder="Password" v-model="passwordR">
                </div>
                <button type="button" class="btn btn-success" @click="signup" >Submit</button>
                </form>
                
        </div>

    </div>
</div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui'
import {config} from '../helpers/firebaseConfig';
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      name: '',
      emailL: '',
      passwordL: '',
      emailR: '',
      passwordR: '',
      msgRegStatus: false,
      msgRegErrStatus: false,
      msgRegVal: 'register succes, please login now',
      msgRegErr: [],
      msgLoginErr: [],
      msgLoginStatus: false

    };
  },
  computed: {
    ...mapState(['msgReg', 'regErr', 'loginErr', 'loginErrVal', 'isToken'])
  },
  methods: {
    ...mapActions(['register', 'login']),

    signup() {
      this.msgRegErr = [];
      if (!this.name) {
        this.msgRegErr.push('name is required');
      }
      if (!this.emailR) {
        this.msgRegErr.push('email is required');
      }
      if (!this.passwordR) {
        this.msgRegErr.push('password is required');
      }

      if (this.msgRegErr.length < 1) {
        let newUser = {
          name: this.name,
          password: this.passwordR,
          email: this.emailR
        };

        this.register(newUser);
        (this.name = ''), (this.passwordR = ''), (this.emailR = '');
      }
    },

    falseReg() {
      this.msgRegStatus = false;
    },

    shMsErrFalse() {
      this.msgRegErrStatus = false;
    },

    signin() {
      this.msgLoginErr = [];
      if (!this.emailL) {
        this.msgLoginErr.push('email is required');
      }
      if (!this.passwordL) {
        this.msgLoginErr.push('password is required');
      }

      if (this.msgLoginErr.length < 1) {
        let userLogin = {
          email: this.emailL,
          password: this.passwordL
        };
        this.login(userLogin);
        this.emailL = '';
        this.passwordL = '';
      }
    },
    falseLoginStatus() {
      this.msgLoginStatus = false;
    },

  },

  created() {
    let token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/');
    }
  },

  mounted() {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ]
      };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    },

  watch: {
    msgReg() {
      this.msgRegStatus = true;
    },

    msgRegErr() {
      this.msgRegErrStatus = true;
    },

    regErr() {
      this.msgRegErrStatus = true;
      this.msgRegErr = [];
      this.msgRegErr.push('email is already in use');
    },

    msgLoginErr() {
      this.msgLoginStatus = true;
    },

    loginErr() {
      this.msgLoginErr = [];
      this.msgLoginStatus = true;
      this.msgLoginErr.push(this.loginErrVal);
    },

    isToken() {
      let token = localStorage.getItem('token');
      if (token) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
</style>
