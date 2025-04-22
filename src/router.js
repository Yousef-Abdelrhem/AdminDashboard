import { createRouter, createWebHistory } from 'vue-router'
import Signup from './pages/signup.vue'
import Login from './pages/login.vue'

const routes = [
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
