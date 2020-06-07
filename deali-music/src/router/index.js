import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import MyPage from '../views/MyPage';
import Lounge from '../views/Lounge';
import Search from '../views/Search.vue';
import PlayPage from '../views/PlayPage';
import Store from '../store/index';
import Mobile from '../views/Mobile.vue';
import CheckPwd from '../views/CheckPwd.vue';
import CheckBrowser from '@/views/CheckBrowser.vue';
import loungeKey from '../../loungeKey';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { unauthorized: true },
    beforeEnter: (to, from, next) => {
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        next('/mobile');
      }
      next();
    },
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
    beforeEnter: (to, from, next) => {
      if (to.query[loungeKey]) {
        next();
      } else {
        next('/checkPwd');
      }
    },
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
    meta: { unauthorized: true },
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: Mobile,
    meta: { unauthorized: true, layout: 'MobileLayout' },
  },
  {
    path: '/checkPwd',
    name: 'checkPwd',
    component: CheckPwd,
    meta: { unauthorized: true, layout: 'MobileLayout' },
  },
  {
    path: '/checkBrowser',
    name: 'CheckBrowser',
    component: CheckBrowser,
    meta: { unauthorized: true, layout: 'MobileLayout' },
  },
  {
      path: '*',
      component: Home,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.unauthorized) === false 
      && !Store.state.login.dealiName) {
        alert('로그인 해주세요.');
        return next('/');
  }
  const browse = navigator.userAgent.toLowerCase();
  if (browse.indexOf("chrome") === -1 && to.path !== '/checkBrowser') {
    return next('/checkBrowser');
  }
  
  return next();
});

export default router
