<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useScreenSize } from "../composables/screenSize";
import { useLineNumber } from "../composables/lineNumber";
import { useStatusStore } from "../store/status";
import gsap from "gsap";
import { useHead } from "unhead";

useHead({
	title: "Welcome",
	meta: [
		{
			name: "description",
			content: "Welcome to my website! Hope you will enjoy it!"
		},
		{
			name: "keywords",
			content:
				"Davide Xie, Davide, Xie, davide xie, davide, xie, daxe9, Daxe9, daxe9.com, daxe9.github.io, github.com/Daxe9"
		}
	]
})

const contentContainer = useLineNumber();
const typeSpeed = 50;
const statusStore = useStatusStore();
const title: string = "Welcome to my portfolio inspired by VIM.";
const showDetails = ref<boolean>(false);
const { width: screenWidth } = useScreenSize();

statusStore.changePageName("xie")

if (import.meta.env.PROD) {
	// TODO: better implementation than a setTimeout
	setTimeout(() => {
		showDetails.value = true;
		gsap.fromTo(
			".details",
			{ 
				opacity: 0,
				x: -100
			},
			{
				opacity: 1,
				duration: 1.5,
				x: 0,
				stagger: {
					each: 0.5,
					from: "start"
				}
			}
		);
	}, typeSpeed * title.length + 400);
} else {
	showDetails.value = true;
}

onMounted(() => {
	if (screenWidth.value < 610) {
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
})

watch(screenWidth, (newValue: number) => {
	// check if the screen is too small to show the details
	if (newValue < 610) {
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
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details"></div>
	</div>
</template>
