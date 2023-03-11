<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useStatusStore } from "../store/status";

const contentContainer = useLineNumber();
const statusStore = useStatusStore();

statusStore.changePageName("roadmap");

type RoadmapRoute = {
	event: string;
	date: string;
	description?: string;
};

const roadmap: RoadmapRoute[] = [
	{
		event: "Start",
		date: "Dec 4, 2022",
		description: "Start of the project, it had only line number implemented"
	},
	{
		event: "Command Line navigation",
		date: "Dec 6, 2022",
		description: "Add command line navigation"
	},
	{
		event: "Revival",
		date: "Feb mid, 2023",
		description:
			"Somehow my professor found out about this project and that made me want to continue it"
	}
];

type Todo = {
	event: string;
	description: string;
};

const todos: Todo[] = [
	{
		event: "Visual block mode",
		description: "Add ability to select line or multiple lines"
	},
	{
		event: "Insert mode",
		description: "Add ability to insert text"
	},
	{
		event: "Settings",
		description: "Add ability to change settings"
	},
	{
		event: "LiveCycle",
		description: "Add livecycle(livecycle.io)"
	}
];
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" />ROADMAP</div>
		<div></div>
		<div v-for="(route, i) in roadmap" :key="i">
			<Spacer :space="4" /><span class="my-fucking-name">{{ route.event }}</span
			>({{ route.date }}) {{ route.description ? "-> " + route.description : "" }}
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" />TODOs</div>
		<div></div>
		<div v-for="(route, i) in todos" :key="i">
			<Spacer :space="4" /><span class="my-fucking-name">{{ route.event }}</span>
			{{ route.description ? "-> " + route.description : "" }}
		</div>
		<div></div>
		<div></div>
		<div>
			<p>
				<Spacer />TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
			</p>
		</div>
		<div></div>
	</div>
</template>

<style scoped></style>
