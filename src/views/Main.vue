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
	// check if the screen is too small to show the details then change items to left aligned
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
		<div v-show="showDetails" class="details">
			<Spacer />Sup, I'm <span class="my-fucking-name">Davide Xie</span>, a student who loves
			developing projects in my free time.
		</div>
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails">
			<Spacer />For those who don't know why this website is kind weird,
		</div>
		<div v-show="showDetails" class="details">
			this is inspired by the sublime text editor VIM, so the appearence may seem quite odd
			for some of you.
		</div>
		<div v-show="showDetails" class="details">
			<Spacer />BUT for those who do know what Vim is, this is website is still shit... lmao
		</div>
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details"><Spacer />As now, I've only manager to have</div>
		<div v-show="showDetails" class="details">
			<Spacer />1. <span class="my-fucking-name">routes navigation</span>:
		</div>
		<div v-show="showDetails" class="details">
			<Spacer space="4" />typing directly ':' and followed by the route name, like
		</div>
		<div v-show="showDetails" class="details"><Spacer space="8" />:contact</div>
		<div v-show="showDetails" class="details">
			2.<Spacer /><span class="my-fucking-name">text highlighting</span>:
		</div>
		<div v-show="showDetails" class="details">
			<Spacer space="4" />typing directly '/' and followed by the target word, like
		</div>
		<div v-show="showDetails" class="details"><Spacer space="8" />/Davide&ltEnter&gt</div>
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details"></div>
		<div v-show="showDetails" class="details">
			<p>
				This website is still in
				<router-link class="links" to="/roadmap">development</router-link>, have mercy:)
			</p>
		</div>
		<div v-show="showDetails" class="details">
			<p>
				You can find the

				<a href="https://github.com/Daxe9/daxe9.com" target="_blank" class="links"
					>source code</a
				>
				on my github
			</p>
		</div>
		<div v-show="showDetails" class="details"></div>
	</div>
</template>
