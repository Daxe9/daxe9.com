<script setup lang="ts">
import { ref } from "vue";
import { useLineNumber } from "../composables/lineNumber";
import { useHead } from "unhead";
import { useStatusStore } from "../store/status";
import { useErrorStore } from "../store/error";

const contentContainer = useLineNumber();
const statusStore = useStatusStore();
const errorStore = useErrorStore();

let lastErrorMessage = "";
const message = ref<string>(errorStore.message || "Something went wrong!");
errorStore.$subscribe((_, state) => {
	message.value = state.message;
});

useHead({
	title: "😭"
});

function getErrorMessage(): string {
	const result = message.value !== lastErrorMessage ? message.value : lastErrorMessage;
	lastErrorMessage = result;
	return result;
}

statusStore.changePageName("error");
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div>
			<h1><Spacer :space="4" />OOOOPS, There's an ERROR:</h1>
		</div>
		<div></div>
		<div class="my-fucking-name">
			<p><Spacer :space="4" />{{ getErrorMessage() }}</p>
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div>
			<p>
				<Spacer />TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
				to go back to home page!
			</p>
		</div>
	</div>
</template>

<style scoped></style>
