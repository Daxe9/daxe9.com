<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useScreenSize } from "./composables/screenSize";
import { useCommandHandler } from "./composables/commandHandler";
import { useStatusStore } from "./store/status";
import { useHead } from "unhead";

const statusStore = useStatusStore();
const mainContainer = ref<HTMLElement | null>(null);
const { width: screenWidth } = useScreenSize();
const pageName = ref<string>(statusStore.pageName);
const { command, mode, isLeaderKeyPressed: _, inputHandler } = useCommandHandler();

useHead({
	titleTemplate: "%s | Davide Xie",
	meta: [
		{
			name: "description",
			content: "Welcome to my website! Hope you will enjoy it!"
		},
		{
			name: "keywords",
			content:
				"Davide Xie, Davide, Xie, daxe9, Daxe9, daxe9.com, daxe9.github.io, github.com/Daxe9"
		}
	]
});

onMounted(() => {
	// focus on the input element
	mainContainer.value?.focus();
});

// subscribe to the pageName changes
statusStore.$subscribe((_, state) => {
	pageName.value = state.pageName;
});
</script>

<template>
	<div class="main-container" tabindex="0" ref="mainContainer" @keydown="inputHandler">
		<div class="router">
			<RouterView />
		</div>
		<div class="controller">
			<div class="status-bar">
				<div class="status-text">{{ mode }}</div>
				<div class="status-title">
					<div>{{ pageName + ".txt" }}</div>
					<div v-show="screenWidth > 610">Copyright © 2023 dev@daxe9.com</div>
				</div>
				<div class="status-text">100% ln:0 %:1</div>
			</div>
			<div class="command-line">
				<label for="input-bar"></label>
				<input type="text" id="input-bar" name="input-bar" v-model="command" disabled />
			</div>
		</div>
	</div>
</template>
