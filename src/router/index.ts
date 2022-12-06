import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const routes = [
	{
		path: "/",
		name: "Main",
		component: Main
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: () => import("../views/404.vue")
	}
];

export default createRouter({
	routes,
	history: createWebHistory()
});
