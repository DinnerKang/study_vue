import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import MyPage from '../views/MyPage';
import Lounge from '../views/Lounge';
import Search from '../views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
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
  next();
});

export default router
