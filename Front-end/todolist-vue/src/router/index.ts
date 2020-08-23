import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import List from "../container/List.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    alias: "/list",
    component: List,
    children: [
      {
        path: "/:view",
        component: List
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
