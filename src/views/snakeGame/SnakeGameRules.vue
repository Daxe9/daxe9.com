<script setup lang="ts">
import { useLineNumber } from "../../composables/lineNumber";
import { useSnakeGameStore } from "../../store/snakeGame";
import { useStatusStore } from "../../store/status";
import { useRouter} from "vue-router";

const snakeGameStore = useSnakeGameStore();
const statusStore = useStatusStore();
const contentContainer = useLineNumber();
const router = useRouter()

snakeGameStore.readRules();
statusStore.changePageName("snakegamerules")


async function goToGamePage() {
	await router.push({ name: "SnakeGame" });
}
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" /><span class="rose">h</span> -> go left</div>
		<div><Spacer :space="4" /><span class="rose">j</span> -> go down</div>
		<div><Spacer :space="4" /><span class="rose">k</span> -> go up</div>
		<div><Spacer :space="4" /><span class="rose">l</span> -> go right</div>
		<div><Spacer :space="4" />quick reminder: arrow keys are not allowed</div>
		<div></div>
		<div><Spacer :space="4" />for every five points you collect, it will be quicker</div>
		<div></div>
		<div><Spacer :space="4" /><span @click="goToGamePage" class="links pointer">THE GAME</span></div>
		<div></div>
	</div>
</template>

<style scoped></style>
