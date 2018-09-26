import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import {config} from './helpers/firebaseConfig'
import wysiwyg from "vue-wysiwyg";

Vue.use(require('vue-moment'));
Vue.use(wysiwyg, {}); 
Vue.config.productionTip = false

new Vue({
  router,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
     })
    },
  store,
  render: h => h(App)
}).$mount('#app')
