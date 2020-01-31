import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import MyPage from '../views/MyPage';
import Lounge from '../views/Lounge';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { unauthorized: true},
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
    meta: { unauthorized: true},
  },
  {
    path: '/lounge',
    name: 'Lounge',
    component: Lounge,
    meta: { unauthorized: true},
  },
  {
      path: '*',
      component: Home,
      meta: { unauthorized: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router
