<template>
	<div class="flex flex-col gap-1">
		<div class="triangle"></div>
		<div class="triangle"></div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.triangle {
	width: 20px;
	height: 20px;
	overflow: hidden;
	position: relative;
	margin: 10px;
}

.triangle:after {
	content: '';
	background: green;
	width: 142%;
	height: 142%;
	position: absolute;
	transform: rotate(45deg) translate(-71%, 0);
}
</style>