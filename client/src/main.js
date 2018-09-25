import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg";
Vue.use(require('vue-moment'));
Vue.use(wysiwyg, {}); 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
