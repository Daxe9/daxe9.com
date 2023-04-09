<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useScreenSize } from "./composables/screenSize";
import { useStatusStore } from "./store/status";
import { useSnakeGameStore } from "./store/snakeGame";
import { Direction } from "./services/snakeGame";
import { useHead } from "unhead";

enum Mode {
	NORMAL = "NORMAL",
	COMMAND = "COMMAND",
	VISUALLINE = "VISUAL-LINE"
}

const statusStore = useStatusStore();
const snakeGameStore = useSnakeGameStore();
const mainContainer = ref<HTMLElement | null>(null);
const command = ref<string>("");
const mode = ref<Mode>(Mode.NORMAL);
const { width: screenWidth } = useScreenSize();
const router = useRouter();
const pageName = ref<string>(statusStore.pageName);

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

// check whether the semicolon is pressed for page redirecting
const isSemiPressed = ref<boolean>(false);

function gameInput(e: KeyboardEvent) {
	// NOTE: do not change this to !snakeGameStore.canPlay
	if (snakeGameStore.canPlay === false) {
		snakeGameStore.canPlay = true;
		return;
	}
	// handle game input
	if (snakeGameStore.hasReadRules) {
		switch (e.key) {
			case "h":
				if (snakeGameStore.input === Direction.RIGHT) return;
				snakeGameStore.setInput(Direction.LEFT);
				break;
			case "j":
				if (snakeGameStore.input === Direction.UP) return;
				snakeGameStore.setInput(Direction.DOWN);
				break;
			case "k":
				if (snakeGameStore.input === Direction.DOWN) return;
				snakeGameStore.setInput(Direction.UP);
				break;
			case "l":
				if (snakeGameStore.input === Direction.LEFT) return;
				snakeGameStore.setInput(Direction.RIGHT);
				break;
			default:
				// if the input is not a valid direction, do nothing
				break;
		}
		return;
	}
}

// handle the keyboard input
function inputHandler(e: KeyboardEvent) {
	gameInput(e);

	// handler insert mode
	if (e.key === "i" && !command.value) {
		command.value = "Cannot make changes, 'modifiable' is off";
		return;
	}

	// when the semicolon is pressed,
	// change the mode to COMMAND and clear the remain command
	if (e.key === ":") {
		isSemiPressed.value = true;
		mode.value = Mode.COMMAND;
		command.value = ":";
	} else {
		// check if the pressed key is not a special key, e.g. shift ctrl alt
		if (isSemiPressed.value && e.key.length === 1) {
			command.value += e.key;
		}

		// chech whether user has pressed backspace key
		if (e.key === "Backspace") {
			command.value = command.value.slice(0, -1);
		}
	}

	// check whether enter is pressed or there are no characters remain
	if (e.key === "Enter" || command.value === "") {
		isSemiPressed.value = false;

		mode.value = Mode.NORMAL;

		// remove the first character ":" and remove whitespaces
		const pathName = command.value.slice(1).replace(/\s/g, "");

		// redirect to selected page
		router.push(pathName);
		return;
	}
}
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
