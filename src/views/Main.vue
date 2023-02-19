<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { setLineNumbers } from "../services/line-number";
import gsap from "gsap";

const contentContainer = ref<HTMLElement | null>(null);
const typeSpeed = 50;
const title = "Welcome to my portfolio inspired by ONE AND ONLY VIM.";
const showDetails = ref<boolean>(false);

onMounted(() => {
	const lines: HTMLCollection | undefined = contentContainer.value?.children;

	if (!lines) return;

	setLineNumbers(lines);
});

// debugging purposes
if (import.meta.env.MODE === "production") {
	setTimeout(() => {
		showDetails.value = true;
		gsap.fromTo(".details", { opacity: 0 }, { opacity: 1, duration: 1.5 });
	}, typeSpeed * title.length + 300);
} else {
	showDetails.value = true;
}
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div>
			<VueWriter
				class="title-writer"
				:array="[title]"
				:typeSpeed="typeSpeed"
				:iterations="1"
			/>
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div v-show="showDetails" class="details">
			<h1>My name is <span class="underline">Davide Xie</span>, currently @Florence, Italy.</h1>
		</div>
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details">
			<p>I like frontend and backend stuffs, and these are some technologies I experienced
				with:</p>
		</div>
		<!-- TODO: comfortable level -->
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details"><p>Frontend:</p></div>
		<div v-show="showDetails" class="details">
			<p><Spacer :space="4"/>HTML Css Javascript Nodejs Typescript Vuejs, React Svelte</p>
		</div>
		<div v-show="showDetails" class="details"><p>Backend:</p></div>
		<div v-show="showDetails" class="details">
			<p><Spacer :space="4" />Express Nestjs</p>
		</div>
		<div v-show="showDetails" class="details"><p>Other tools:</p></div>
		<div v-show="showDetails" class="details">
			<p><Spacer :space="4" />Git, Docker, <span class="underline">Vim</span></p>
		</div>
	</div>
</template>
