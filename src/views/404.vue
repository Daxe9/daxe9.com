<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStatusStore } from "../store/status";
import { useLineNumber } from "../composables/lineNumber";
import { useHead } from "unhead";

useHead({
	title: "😭"
})

const statusStore = useStatusStore();
const contentContainer = useLineNumber();
const route = useRoute();

statusStore.changePageName("error");
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div>
			<h1><Spacer :space="4" />OOOOPS, there's no page with GIVEN NAME: {{ route.path }}</h1>
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
