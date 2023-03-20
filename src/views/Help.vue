<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useStatusStore } from "../store/status";
import { routes } from "../router";

const contentContainer = useLineNumber();
const statusStore = useStatusStore();

statusStore.changePageName("help");

routes.pop();
</script>

<template>
	<div class="content-container" ref="contentContainer">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" />The following is a list of available pages in my website!</div>
		<div></div>
		<div v-for="(route, i) in routes" :key="i">
			<Spacer :space="4" /><a :href="route.path" class="links">{{ route.name }}</a>
		</div>
		<div></div>
		<div></div>
		<div>
			<p>
				<Spacer />TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
			</p>
		</div>
	</div>
</template>

<style scoped></style>
