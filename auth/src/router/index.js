import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import VueCookies from 'vue-cookies'

import { refreshToken } from '../service/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( async(to, from, next) => {

  if(VueCookies.get('token')===null && VueCookies.get('refresh_token') !== null){
    console.log('refresh', VueCookies.get('refresh_token'));
    await refreshToken();
  }

  if (to.matched.some(record => record.meta.requiresAuth) || VueCookies.get('token')){
    return next();
  }
    alert('로그인 해주세요');
    return next('/login');
})


export default router
