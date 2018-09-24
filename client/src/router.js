import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('./views/Forum.vue'),
      children: [
        {
          path: '/forum',
          name: 'forum-cp',
          component: () => import('./components/Card.vue')
        },
        {
          path: '/forum/:id',
          name: 'forum-detail',
          component: () => import('./components/DetailQs.vue')
        }
      ]
    }
  ]
})
