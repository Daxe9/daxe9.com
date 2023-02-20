<script setup lang="ts">
import { ref, onMounted } from "vue";
import { setLineNumbers } from "../services/line-number";
import { useRoute } from "vue-router";

const mainContainer = ref<HTMLElement | null>(null);
const route = useRoute();

onMounted(() => {
	const lines: HTMLCollection | undefined = mainContainer.value?.children;

	if (!lines) return;

	setLineNumbers(lines);
});
</script>

<template>
	<div ref="mainContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div>
			<h1><Spacer :space="4" />BROOOO, I'm so sorry the page is still in development.</h1>
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div>
			<Spacer />
			<p>Frontend: I lov</p>
		</div>
		<div></div>
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
