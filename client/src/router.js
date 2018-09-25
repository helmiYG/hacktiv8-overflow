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
          component: () => import('./components/DetailQs.vue'),
          children: [
          ]
        },
        {
          path: '/forum/:id/edit/:idanswer/answer',
          name: 'edit-answer',
          component: () => import('./components/EditAnswer.vue')
        }
      ]
    },
    {
      path: '/myquestions',
      name: 'myquestion',
      component: () => import('./views/MyQ.vue'),
      children: [
        {
          path: '/myquestions',
          name: 'myquestion-cp',
          component: () => import('./components/MyQCp')
        },
        {
          path: '/myquestions/addquestion',
          name: 'addquestion',
          component: () => import('./components/AddQuestion')
        },
        {
          path: '/myquestions/:id',
          name: 'questions-detail',
          component: () => import('./components/DetailUserQ')
        },
        {
          path: '/myquestions/:id/edit/:idanswer/answer',
          name: 'edit-answeruser',
          component: () => import('./components/EditUserAnswer')
        },
        {
          path: '/myquestions/:id/edit',
          name: 'edit-questions',
          component: () => import('./components/EditQuestion')
        },
      ]
    }
  ]
})
