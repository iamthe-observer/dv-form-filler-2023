<template>
	<div :id="`output${idx}`">
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
	ctnt: string
	speed: number
	increment: number
	idx: number
}>(), {
	ctnt: "Hello World",
	speed: 20,
	increment: 8,
})

onMounted(() => {
	let theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-"; //You can customize what letters it will cycle through
	// let ctnt = "Ransford"; // Your text goes here
	// let speed = 20; // ms per frame
	// let increment = 8; // frames per step. Must be >2


	let clen = props.ctnt.length;
	let si = 0;
	let stri = 0;
	let block = "";
	let fixed = "";

	//Call self x times, whole function wrapped in setTimeout
	(function rustle(i) {
		setTimeout(function () {
			if (--i) { rustle(i); }
			nextFrame(i);
			si = si + 1;
		}, props.speed);
	})(clen * props.increment + 1);

	/**
	 * Generates the next frame of the animation.
	 *
	 * @param {number} pos - The current position in the animation.
	 * @return {void} This function does not return a value.
	 */
	function nextFrame(pos: number) {
		for (let i = 0; i < clen - stri; i++) {
			//Random number
			let num = Math.floor(theLetters.length * Math.random());
			//Get random letter
			let letter = theLetters.charAt(num);
			block = block + letter;
		}
		if (si == (props.increment - 1)) {
			stri++;
		}
		if (si == props.increment) {
			// Add a letter;
			// every speed*10 ms
			fixed = fixed + props.ctnt.charAt(stri - 1);
			si = 0;
		}
		// $("#output").html(fixed + block);
		const outputElement = document.getElementById(`output${props.idx}`) as HTMLElement;
		outputElement.innerHTML = fixed + block;
		block = "";
	}
})
</script>

<style scoped></style>