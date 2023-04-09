<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useHead } from "unhead";
import { useStatusStore } from "../store/status";
import { useErrorStore } from "../store/error";

const contentContainer = useLineNumber();
const statusStore = useStatusStore();
const errorStore = useErrorStore();

const message = errorStore.message || "Something went wrong";
console.log(message)

useHead({
	title: "😭"
});

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
			<p><Spacer :space="4" />{{ message }}</p>
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div>
			<p>
				<Spacer />TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
			</p>
		</div>
	</div>
</template>

<style scoped></style>
