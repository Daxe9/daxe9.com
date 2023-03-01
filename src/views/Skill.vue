<script setup lang="ts">
import { useLineNumber } from "../composables/lineNumber";
import archLogo from "@/assets/archlinux.png";
import { useStatusStore } from "../store/status";
import { useHead } from "unhead";

useHead({
	title: "Skill",
	meta: [
		{
			name: "description",
			content: "Those are the technologies I enjoy using and learning about."
		},
		{
			name: "keywords",
			content:
				"Davide Xie Skill, Daxe9 Skill"
		}
	]
});

const contentContainer = useLineNumber();
const statusStore = useStatusStore();

statusStore.changePageName("skill")
</script>

<template>
	<div ref="contentContainer" class="content-container">
		<div></div>
		<div></div>
		<div></div>
		<div>
			<h1><Spacer :space="4" />BROOOO, I'm so sorry the page is still in development.</h1>
		</div>
		<div></div>
		<div></div>
		<div>
			<Spacer :space="4" />
			<p class="my-fucking-name">config.toml</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>[<a href="https://github.com/Daxe9/dotfiles" target="_blank" class="links">system</a>]</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>os = GNU/Linux</p>
		</div>
		<div>
			<!-- here the space's three for aligning the text -->
			<Spacer :space="3" />
			<p>
				distribution =
				<img :src="archLogo" alt="arch linux logo" />
			</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>display-server = X11(unfortunately)</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>window-manager = i3-gaps</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>compositor = picom</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>status-bar = polybar</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>application-launcher = rofi</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>editor = neovim</p>
		</div>
		<div></div>
		<div>
			<Spacer :space="4" />
			<p>[frontend]</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>html = pretty good with it</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>css = hatred</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>js-ts = loved</p>
		</div>
		<div>
			<Spacer :space="4" />
			<p>vue = have been using it forever</p>
		</div>
		<div></div>
		<div></div>
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
