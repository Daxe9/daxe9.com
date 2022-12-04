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
		<div>
			<VueWriter 
				class="title-writer"
				:array="['Welcome to my portfolio inspired by ONE AND ONLY VIM.']"
				:typeSpeed="70"
				:iterations="1" />
		</div>
	</div>
</template>
