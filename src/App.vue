<script setup lang="ts">

</script>

<template>
	<div class="main-container">
		<div class="router" >
			<RouterView />
		</div>
		<div class="controller">
			<div class="status-bar">
				<div class="mode status-text">NORMAL</div>
				<div class="mode status-title">xie.txt</div>
				<div class="mode status-text">100% ln:0 %:1</div>
			</div>
			<div class="command-line">
				:help xie		
			</div>
		</div>
	</div>
</template>

