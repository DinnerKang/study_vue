import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import MyPage from '../views/MyPage';
import Lounge from '../views/Lounge';
import Search from '../views/Search.vue';
import PlayPage from '../views/PlayPage';
import Store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { unauthorized: true },
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/lounge',
    name: 'Lounge',
    component: Lounge,
    meta: { unauthorized: true, layout: 'MobileLayout' },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { unauthorized: true },
  },
  {
    path: '/playPage',
    name: 'PlayPage',
    component: PlayPage,
  },
  {
      path: '*',
      component: Home,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.unauthorized) === false 
      && !Store.state.login.dealiName) {
        alert('로그인 해주세요.');
        return next('/');
  }
  return next();
});

export default router
