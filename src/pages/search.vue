<template>
	<section class="w-full bg-neutral-900 relative">
		<header class="w-full h-10 sticky top-0 flex justify-between items-center px-3 bg-neutral-800">
			<span @click="$router.back()" class="text-lg hover:text-white cursor-pointer">Back</span>
			<span class="font-bold text-xl">Search Results</span>
		</header>

		<main class="py-5 px-4 w-full flex flex-col gap-3">
			<div
				class="w-full min-h-[40px] bg-black text-white rounded-xl hover:bg-purple-800 hover:text-black flex justify-between items-center px-3 gap-2"
				v-if="results.length !== 0" @click="handleClick(apl.apl_id!)" v-for="(apl, i) in results" :key="i">
				<span class="">{{ i + 1 }}</span>
				<span class="w-full font-bold"> {{
					apl.fullName }}</span>
				<span class="w-full text-right"> {{
					__.formatDateWords(new Date(apl.created_at!)) }}</span>
			</div>

			<div v-else
				class=" w-full text-center text-neutral-400 font-bold py-5 px-3 flex items-center justify-center text-xl">No
				Applicants Found!</div>
		</main>
	</section>
</template>

<script setup lang="ts">
import { useAppStore } from '~/store/app';
import { storeToRefs } from 'pinia';

const __ = useAppStore()
const { results } = storeToRefs(__)

async function handleClick(id: string) {
	let apl = await __.getApl(id)
	__.goToApl(apl![0])
}
</script>

<style scoped></style>