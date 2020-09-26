import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/course/:kind',
    name: 'Course',
    component: () =>
      import(/* webpackChunkName: "course" */ '@/views/Course.vue'),
    props: true,
  },
  {
    path: '*',
    name: 'Error',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Error.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
