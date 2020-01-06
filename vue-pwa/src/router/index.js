import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';
import MyPage from '../views/MyPage';

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
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage
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
  const name = Store.state.userName;
  if (name === '' && to.matched.some(record => record.meta.unauthorized) === false) {
    next('/login');
  }
  next();
});

export default router
