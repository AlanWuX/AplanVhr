import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'



Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    hidden: true
  }
]

const router = new Router({
  routes
})

export default router
