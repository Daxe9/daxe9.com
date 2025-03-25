<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useHead } from "unhead";
import { useStatusStore } from "../store/status";

useHead({
	title: "Contact",
	meta: [
		{
			name: "description",
			content: "Get in touch with me."
		},
		{
			name: "keywords",
			content: "Davide Xie Contact, Daxe9 Contact"
		}
	]
});
const contentContainer = useLineNumber();
const statusStore = useStatusStore();

statusStore.changePageName("contact");
</script>

<template>
	<div ref="contentContainer" class="content-container">
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
				href="https://www.linkedin.com/in/davide-xie-8326a922b/"
				target="_blank"
				class="links"
				>Davide Xie</a
			>
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div>
			<Spacer />
			<p>
				TIPS: try out this command :/ or
				<router-link to="/" class="links">simply click me</router-link>
				to go back to home page!
			</p>
		</div>
	</div>
</template>

<style></style>
