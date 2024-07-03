<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useStatusStore } from "../store/status";
import { useRoute } from "vue-router";
import { useHead } from "unhead";

useHead({
	title: "Roadmap",
	meta: [
		{
			name: "description",
			content: "Know my roadmap"
		}
	]
});

const contentContainer = useLineNumber();
const statusStore = useStatusStore();
const route = useRoute();

let issues: any = route.meta.issues ?? [];
issues = issues.reverse();

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
		<div v-for="(issue, i) in issues" :key="i">
			<Spacer :space="4" /><span class="my-fucking-name">{{ issue.title }}</span>
			{{ issue.body ? "-> " + issue.body : "" }}
		</div>
		<div></div>
		<div></div>
		<div>
			<p>
				<Spacer />TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
				to go back to home page!
			</p>
		</div>
		<div></div>
	</div>
</template>

<style scoped></style>
