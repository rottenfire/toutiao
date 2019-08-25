import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'main',
          component: Main
        },
        {
          path: 'commentList',
          component: () => import('./views/comment/comment.vue')
        },
        {
          path: '/home/materialManage',
          component: () => import('./views/material/material.vue')
        },
        {
          path: '/home/containerList',
          component: () => import('./views/content/content.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
