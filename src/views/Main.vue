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
		}
	]
});

const contentContainer = useLineNumber();
const typeSpeed = 50;
const statusStore = useStatusStore();
const title: string = "Welcome to my portfolio inspired by VIM.";
const showDetails = ref<boolean>(false);
const { width: screenWidth } = useScreenSize();

statusStore.changePageName("xie");

// release animation when in prod mode
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

function screenWidthChanged(value: number) {
	// check if the screen is too small to show the details
	if (value < 610) {
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
}

onMounted(() => {
	screenWidthChanged(screenWidth.value);
});

watch(screenWidth, (newValue: number) => {
	screenWidthChanged(newValue);
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
		<div v-show="showDetails" class="details bold centered-text">
			<div>
				<a href="/help" class="links">:help - Tutorial</a>
			</div>
		</div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails" class="details"><Spacer />Greetings!</div>
		<div v-show="showDetails" class="details">
			I am <span class="my-fucking-name">Davide Xie</span>, an 20-year-old student from
			Florence.
		</div>
		<div v-show="showDetails" class="details">
			Currently, I am a pre-computer science student who has recently graduated from high
			school - ITIS Antonio Meucci. Most of my knowledge is self-taught. I have a dedicated
			page for showcasing my skills, where others can learn more about them(visit
			<router-link class="links" to="/skill">/skill</router-link>). Since I am a big fan of
			Vim motion, Vim and terminal based applications in general, I have decided to challenge
			myself by creating an entire site powered by Vim's features, providing an immersive
			keyboard-driven experience. Whether you are a fellow Vim enthusiast or simply curious
			about my journey, I encourage you to embark on this adventure with me.
		</div>
		<div v-show="showDetails"></div>
		<div v-show="showDetails">Yaa as you can see the paragraph before is ai generated</div>
		<div v-show="showDetails" class="details">
			<p>
				This website is still in
				<router-link class="links" to="/roadmap">development</router-link>, have mercy:)
			</p>
		</div>
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details"></div>
	</div>
</template>
