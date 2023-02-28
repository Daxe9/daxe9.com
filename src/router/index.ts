import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const routes = [
	{
		path: "/",
		name: "Main",
		component: Main
	},
	{
		path: "/skill",
		name: "Skill",
		component: () => import("../views/Skill.vue")
	},
	{
		path: "/contact",
		name: "Contact",
		component: () => import("../views/Contact.vue")
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
