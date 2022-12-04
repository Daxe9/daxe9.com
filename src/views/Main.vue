<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { setLineNumbers } from "../services/line-number";
const contentContainer = ref<HTMLElement | null>(null);

onMounted(() => {

	const lines: HTMLCollection | undefined = contentContainer.value?.children

	if (!lines) return;
	
	setLineNumbers(lines);
})

</script>

<template>
	<div ref="contentContainer" class="content-line">
		<div></div>	
		<div></div>	
		<div></div>	
		<div></div>	
		<div></div>	
		<div></div>	
		<div></div>	
		<div></div>	
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div><p>Welcome to my homepage</p></div>
	</div>
</template>
