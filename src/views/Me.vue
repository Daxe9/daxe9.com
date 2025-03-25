<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useStatusStore } from "../store/status";
import { useHead } from "unhead";
useHead({
	title: "More about me",
	meta: [
		{
			name: "Davide Xie, me",
			content: "Davide Xie, personal info, story"
		}
	]
});

const statusStore = useStatusStore();
const contentContainer = useLineNumber();

statusStore.changePageName("more");
</script>
<template>
	<div class="content-container" ref="contentContainer">
		<div></div>
		<div></div>
		<div></div>
		<div>
			<Spacer />
			<p class="my-fucking-name details">SOME INFORMATION ABOUT ME</p>
		</div>
		<div></div>
		<div class="details">
			I am <span class="my-fucking-name">Davide Xie</span>, a 20-year-old student from
			Florence.
		</div>
		<div class="details">
			Currently, I am enrolled in Industrial Engineering Program at Politecnico di Milano.
			Most of my knowledge is self-taught. I have a dedicated page for showcasing my skills,
			where others can learn more about them(visit
			<router-link class="links" to="/skill">/skill</router-link>).
		</div>
		<div></div>
		<div class="details">
			Since I am a big fan of Vim motion, Vim and terminal based applications in general, I
			have decided to challenge myself by creating an entire site powered by Vim's features,
			providing an immersive keyboard-driven experience. Whether you are a fellow Vim
			enthusiast or simply curious about my journey, I encourage you to embark on this
			adventure with me.
		</div>
		<div></div>
		<div></div>
		<div>
			<Spacer />
			<p>
				TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
				to go back to home page!
			</p>
		</div>
	</div>
</template>

<style scoped></style>
