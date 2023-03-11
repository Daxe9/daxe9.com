<script setup lang="ts">
import { ref, Ref } from "vue";
import { setLineNumbers } from "../../services/line-number";
import { useHead } from "unhead";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { snakeGame } from "../../services/snakeGame";
import { useSnakeGameStore } from "../../store/snakeGame";
import { useStatusStore } from "../../store/status";

useHead({
	title: "Snake Game"
});

const router = useRouter();
const statusStore = useStatusStore();
const snakeGameStore = useSnakeGameStore();
const contentContainer: Ref<HTMLElement | null> = ref(null);
const gameBoard: Ref<HTMLCanvasElement | null> = ref(null);
const gameBoardWidth: Ref<number> = ref<number>(0);
const gameBoardHeight: Ref<number> = ref<number>(0);
let gameBoardContext: CanvasRenderingContext2D | null | undefined = null;

let lineHeight: number = 0;
let timeout: number = 0;

statusStore.changePageName("snakegame");

snakeGameStore.$subscribe((_, state) => {
	if (state.canPlay) {
		if (!gameBoardContext) {
			router.push("/");
			return;
		}
		snakeGame(gameBoardContext, lineHeight, gameBoardWidth.value, gameBoardHeight.value);
		state.canPlay = null;
	}
});

window.addEventListener("resize", () => {
	// debounce
	clearTimeout(timeout);

	if (!gameBoardContext) {
		router.push("/");
		return;
	}

	gameBoardContext.clearRect(0, 0, gameBoardWidth.value, gameBoardHeight.value);

	// TODO: resize the board on window resize
	/* timeout = setTimeout(() => drawGrid(lineHeight), 1000); */
});

onMounted(() => {

	if (!snakeGameStore.hasReadRules) {
		router.push({name: "SnakeGameRules"})
	}
	// get html collections of all lines
	let lines: HTMLCollection | undefined = contentContainer.value?.children;
	if (!lines) return;

	// get height of container
	let containerHeight: number = contentContainer.value?.clientHeight ?? 0;

	// check whether exists at least 1 element and then get height of it
	if (lines.item(0)) {
		lineHeight = lines.item(0)?.clientHeight ?? 0;
	}

	// if there is no element, create one, get height and then remove it
	if (lineHeight === 0) {
		const newDiv = document.createElement("div");
		newDiv.innerText = "1";
		contentContainer.value?.appendChild(newDiv);
		lineHeight = contentContainer.value?.children.item(0)?.clientHeight ?? 0;
		contentContainer.value?.removeChild(contentContainer.value.lastChild!);
	}

	// check how many elements are needed to fill the container
	const neeededElements: number =
		Math.floor((containerHeight - lineHeight * lines.length) / lineHeight) - 1;

	// create elements and append them to container
	for (let i = 0; i < neeededElements; i++) {
		const newDiv = document.createElement("div");
		contentContainer.value?.appendChild(newDiv);
	}

	// set line number
	setLineNumbers(lines);

	// set game board size
	gameBoardContext = gameBoard.value?.getContext("2d");
	const width: number = gameBoard.value?.offsetWidth ?? 0;
	const height: number = gameBoard.value?.offsetHeight ?? 0;

	if (width === 0 || height === 0) return;

	gameBoardWidth.value = width;
	gameBoardHeight.value = height;

	gameBoard.value!.width = width;
	gameBoard.value!.height = height;
	
	if (!gameBoardContext) return;

	snakeGame(gameBoardContext, lineHeight, gameBoardWidth.value, gameBoardHeight.value);
});


</script>

<template>
	<div class="game-container">
		<div ref="contentContainer" class="content-container">
		</div>
		<div class="game-board-container">
			<canvas ref="gameBoard" id="game-board"></canvas>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.game-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
}

.game-board-container {
	flex-grow: 1;
}

#game-board {
	width: 100%;
	height: 100%;
}

.content-container {
	min-width: 35px;
	max-width: 35px;
}
</style>
