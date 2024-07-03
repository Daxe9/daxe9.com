import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized,
	NavigationGuardNext
} from "vue-router";
import Main from "../views/Main.vue";
import { useErrorStore } from "../store/error";

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
		path: "/roadmap",
		name: "Roadmap",
		component: () => import("../views/Roadmap.vue"),
		beforeEnter: async (
			to: RouteLocationNormalized,
			_: RouteLocationNormalized,
			next: NavigationGuardNext
		) => {
			try {
				const res = await fetch("https://api.github.com/repos/Daxe9/daxe9.com/issues");
				const data = await res.json();
				// check if is an error from the api call
				if (data.message) {
					throw new Error(data.message);
				}
				// pass data to the component as meta property
				to.meta.issues = data;
			} catch (err: any) {
				// if it's in development mode, log the error
				if (import.meta.env.DEV) {
					console.log(err);
				}

				const errorStore = useErrorStore();
				errorStore.message = err.message;

				return next({ name: "Error" });
			}
			next();
		},
		meta: {
			issues: []
		}
	},
	/*
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
    */
	{
		path: "/help",
		name: "Help",
		component: () => import("../views/Help.vue")
	},
	{
		path: "/error",
		name: "Error",
		component: () => import("../views/Error.vue"),
		meta: {
			message: ""
		}
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		component: () => import("../views/404.vue")
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

// check whether the access is from a mobile device
function isMobileDevice() {
	return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
}

router.beforeEach((to, _, next) => {
	if (to.name !== "Error") {
		if (isMobileDevice()) {
			const errorStore = useErrorStore();
			errorStore.changeMessage("Mobile devices are not supported yet! :(");
			return next("/error");
		}
	}
	return next();
});

export default router;
