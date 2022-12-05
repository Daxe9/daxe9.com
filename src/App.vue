<script setup lang="ts">
import { ref, onMounted } from "vue";

const mainContainer = ref<HTMLElement | null>(null);
const command = ref<string>(":help xie");

onMounted(() => {
	mainContainer.value?.focus();
})

const isSemiPressed = ref<boolean>(false);

function checkCommandInput(e: KeyboardEvent) {
	if (e.key === "Enter" || !command.value) {
		isSemiPressed.value = false;
		if (command.value) {
			command.value = "";
		} 

		// router
	}

	if (e.key === ":") {
		isSemiPressed.value = true;
		command.value = ":";
	} else {
		if (isSemiPressed.value && !(e.key.length-1)) {
			command.value += e.key;
		} 

		if (e.key === "Backspace") {
			command.value = command.value.slice(0, -1);
		}
	}

}
</script>

<template>
	<div class="main-container" tabindex="0" ref="mainContainer" @keydown="checkCommandInput" >
		<div class="router">
			<RouterView />
		</div>
		<div class="controller">
			<div class="status-bar">
				<div class="mode status-text">NORMAL</div>
				<div class="mode status-title">xie.txt</div>
				<div class="mode status-text">100% ln:0 %:1</div>
			</div>
			<div class="command-line">
				<input type="text" v-model="command" disabled />
			</div>
		</div>
	</div>
</template>
