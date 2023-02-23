<script lang="ts" setup>
import Spacer from "@/components/Spacer.vue";
import { ref, onMounted, watch } from "vue";
import { setLineNumbers } from "../services/line-number";
import { useScreenSize } from "../composables/screenSize";

import gsap from "gsap";

const contentContainer = ref<HTMLDivElement | null>(null);
const typeSpeed = 50;
const title: string = "Welcome to my portfolio inspired by VIM.";
const showDetails = ref<boolean>(false);
const { width: screenWidth } = useScreenSize();

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

watch(screenWidth, (newValue: number) => {
	// check if the screen is too small to show the details
	if (newValue < 480) {
		for (const line of Array.from(contentContainer.value?.children || [])) {
			if (line.classList.contains("centered-text")) {
				line.classList.remove("centered-text");
				(line as HTMLElement).dataset.needsCentered = "true";
			}
		}
	} else {
		for (const line of Array.from(contentContainer.value?.children || [])) {
			if ((line as HTMLElement).dataset.needsCentered) {
				line.classList.add("centered-text");
			}
		}
	}
});
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
				<p>type `:[path of the page]`</p>
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
			them(visit <router-link class="links" to="/skill">/skill</router-link>).
		</div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails"></div>
	</div>
</template>
