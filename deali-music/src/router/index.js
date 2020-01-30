import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';
import MyPage from '../views/MyPage';
import Lounge from '../views/Lounge';

import Store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { unauthorized: true},
    component: Login,
    beforeEnter: (to, from, next) => {
      if (Store.state.googleId) {
          next('/');
          return;
      }
      next();
    },
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/lounge',
    name: 'Lounge',
    component: Lounge,
  },
  {
      path: '*',
      component: Login,
      meta: { unauthorized: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const userName = Store.state.userName;
  if (userName === '' && to.matched.some(record => record.meta.unauthorized) === false) {
    next('/login');
  }
  next();
});

export default router
