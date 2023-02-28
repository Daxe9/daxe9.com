<script setup lang="ts">
import Spacer from "../components/Spacer.vue";
import { useLineNumber } from "../composables/lineNumber";
const contentContainer = useLineNumber();
</script>

<template>
	<div ref="contentContainer">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" />I would love to hear from you</div>
		<div><Spacer :space="4" />Get in touch 👥:</div>
		<div></div>
		<div>
			<Spacer :space="4" />email -
			<a href="mailto:dev@daxe9.com" class="links">dev@daxe9.com</a>
		</div>
		<div>
			<Spacer :space="4" />github -
			<a href="https://github.com/Daxe9" target="_blank" class="links">Daxe9</a>
		</div>
		<div>
			<Spacer :space="4" />linkedin -
			<a
				href="https://www.linkedin.com/in/i-m-a-bacon-but-i-have-a-dream-8326a922b/"
				target="_blank"
				class="links"
				>I'm a bacon but I have a dream</a
			>
		</div>
		<div></div>
	</div>
</template>

<style scoped></style>
