<script lang="ts" setup>
import Spacer from "@/components/Spacer.vue";
import { ref, onMounted } from "vue";
import { setLineNumbers } from "../services/line-number";
import gsap from "gsap";

const contentContainer = ref<HTMLElement | null>(null);
const typeSpeed = 50;
const title = "Welcome to my portfolio inspired by VIM.";
const showDetails = ref<boolean>(false);

onMounted(() => {
	const lines: HTMLCollection | undefined = contentContainer.value?.children;

	if (!lines) return;

	setLineNumbers(lines);
});

// debugging purposes
if (import.meta.env.PROD) {
	setTimeout(() => {
		showDetails.value = true;
		gsap.fromTo(".details", { opacity: 0 }, { opacity: 1, duration: 1.5 });
	}, typeSpeed * title.length + 400);
} else {
	showDetails.value = true;
}
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div class="centered-text">
			<div>
				<VueWriter
					class="title-writer"
					:array="[title]"
					:typeSpeed="typeSpeed"
					:iterations="1"
				/>
			</div>
		</div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails" class="centered-text">
			<div>
				<p>type `:[name of the page, aka the path]`</p>
			</div>
		</div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails" class="details"><Spacer /> Greetings!</div>
		<div v-show="showDetails" class="details">
			<Spacer />
			I am <span class="my-fucking-name">Davide Xie</span>, an 18-year-old high school student
			from Florence.
		</div>
		<div v-show="showDetails" class="details">
			<Spacer />
			Currently, I am taking a pre computer-science course at A. Meucci, but most of knowledge
			is self-taught. I have a dedicated page for my skills where others can learn more about
			them(visit /skill).
		</div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails"></div>
	</div>
</template>
