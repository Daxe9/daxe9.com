<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import { useStatusStore } from "../store/status";
import { routes } from "../router";
import { useHead } from "unhead";

useHead({
	title: "Tutorial - Help",
	meta: [
		{
			name: "description",
			content: "Know how to navigate my website"
		}
	]
});
const contentContainer = useLineNumber();
const statusStore = useStatusStore();

statusStore.changePageName("help");

routes.pop();
</script>

<template>
	<div class="content-container" ref="contentContainer">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" />Navigation:</div>
		<div>
			<Spacer :space="4" />You can use links to navigate between different web pages in my
			website.
		</div>
		<div>
			<Spacer :space="4" />However, it offers
			<span class="highlighted">vim motion inspired</span> navigation.
		</div>
		<div>
			<Spacer :space="4" />Using <span class="highlighted">:&ltpage-name&gt</span> you can go
			to that page.
		</div>
		<div></div>
		<div><Spacer :space="4" />Highlighting:</div>
		<div>
			<Spacer :space="4" />Using <span class="highlighted">/&ltword&gt</span> you can find all
			occurrences of that word!
		</div>
		<div>
			<Spacer :space="4" />I know Firefox users could not be happy with this command, well
			deal with it.
		</div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" />The following is a list of available pages in my website!</div>
		<div></div>
		<div v-for="(route, i) in routes" :key="i">
			<Spacer :space="4" /><a :href="route.path" class="links">{{ route.name }}</a>
		</div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div><Spacer :space="4" /></div>
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
