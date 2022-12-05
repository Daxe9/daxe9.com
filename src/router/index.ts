import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
