<script setup lang="ts">
import { ref, onMounted } from "vue";
import { setLineNumbers } from "../services/line-number"
import { useRoute } from "vue-router";

const mainContainer = ref<HTMLElement | null>(null);
const route = useRoute();

onMounted(() => {
	const lines: HTMLCollection | undefined = mainContainer.value?.children;

	if (!lines) return;

	setLineNumbers(lines);
})

</script>

<template>
	<div ref="mainContainer" class="content-container">
		<div></div>	
		<div></div>	
		<div></div>	
		<div>
			<h1><Spacer space="4" />OOOOPS, there's no page with GIVEN NAME: {{ route.path }}</h1>
		</div>	
		<div></div>	
		<div></div>	
		<div></div>	
		<div>
			<p><Spacer />TIPS: try out command :/ </p>
		</div>	
	</div>
</template>
