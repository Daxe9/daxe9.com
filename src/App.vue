<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useScreenSize } from "./composables/screenSize";

const mainContainer = ref<HTMLElement | null>(null);
const command = ref<string>(":help xie");
const mode = ref<string>("NORMAL");
const { width: screenWidth } = useScreenSize();
const router = useRouter();

onMounted(() => {
	mainContainer.value?.focus();
});

const isSemiPressed = ref<boolean>(false);

function checkCommandInput(e: KeyboardEvent) {
	// check whether enter is pressed or there're no characters remain
	if (e.key === "Enter" || !command.value) {
		isSemiPressed.value = false;

		mode.value = "NORMAL";

		// redirect to selected page
		// remove the first character ":" and remove the whitespaces, then go to the page
		router.push(command.value.slice(1).replace(/\s/g, ""));
	}

	// when the semicolon is pressed,
	// change the mode to COMMAND and clear the remain command
	if (e.key === ":") {
		isSemiPressed.value = true;
		mode.value = "COMMAND";
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
}
</script>

<template>
	<div class="main-container" tabindex="0" ref="mainContainer" @keydown="checkCommandInput">
		<div class="router">
			<RouterView />
		</div>
		<div class="controller">
			<div class="status-bar">
				<div class="status-text">{{ mode }}</div>
				<div class="status-title">
					<div>xie.txt</div>
					<div v-show="screenWidth > 610">Copyright © 2023 dev@daxe9.com</div>
				</div>
				<div class="status-text">100% ln:0 %:1</div>
			</div>
			<div class="command-line">
				<input type="text" v-model="command" disabled />
			</div>
		</div>
	</div>
</template>
