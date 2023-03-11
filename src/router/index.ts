import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

export const routes = [
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
		path: "/snake",
		name: "Snake",
		children: [
			{
				path: "",
				name: "SnakeGameRules",
				component: () => import("../views/snakeGame/SnakeGameRules.vue")
			},
			{
				path: "game",
				name: "SnakeGame",
				component: () => import("../views/snakeGame/SnakeGame.vue")
			}
		]
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
