import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Todo from '../views/Todo.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
