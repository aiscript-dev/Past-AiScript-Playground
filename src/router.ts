import { createRouter, createWebHashHistory } from 'vue-router';
import MainArea, { latest } from "./MainArea.vue";

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			redirect: () => window.localStorage.getItem("version") ?? latest,
		},
		{
			path: '/:ver',
			component: MainArea,
			props: true,
		},
	],
});
