<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
	space: {
		type: Number,
		default: 1,
	}
});

let spacer = "";
for (let i = 0; i < props.space; i++) {
	spacer += "&nbsp;";
}
</script>

<template>
	<span v-html="spacer"></span>
</template>

