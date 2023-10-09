<template>
	<div class="min-h-fit p-3 bg-black text-white rounded-md flex flex-col gap-2">

		<header :class="['flex items-center w-full', !apl_count ? 'justify-end' : 'justify-between']">
			<RandomText v-if="apl_count" :idx="5" class="font-semibold text-lg"
				:ctnt="`Hello, ${profile?.fullname} [${apl_count}]`" :increment="10" :speed="10">
			</RandomText>

			<span
				class="bg-red-400 hover:bg-red-600 transition-all duration-200 ease-out cursor-pointer text-black px-2 py-1 rounded-xl font-bold"
				@click="handleLogout">
				Sign Out
			</span>
		</header>

		<div class="flex flex-col flex-1 bg-neutral-900 rounded-xl border border-neutral-600 border-2 p-3">

			<div class="flex items-center justify-between w-full h-full">
				<section class="flex flex-col items-center justify-between">
					<div class="text-center font-semibold text-purple-400 bg-black radial-progress"
						:style="`--value:${confirmed_apls && apl_count ? (confirmed_apls.length / apl_count) * 100 : 0}; --size:8rem; --thickness: 1.2rem;`">
						{{ confirmed_apls ? confirmed_apls.length : 0 }} / {{ apl_count }}
						<br />confirmed
					</div>
				</section>

				<section class="w-full flex flex-col gap-6 flex-1">
					<div v-for="(item, i) in monthly_confirmed_apls" :key="i" class="flex justify-evenly items-center w-full">
						<progress class="progress w-[70%] h-4" :value="getMonthData(i + 8)?.length" :max="item.val"></progress>

						<span class="flex items-center justify-center font-semibold tracking-wider">
							{{ getMonth(item.month) }}: {{ getMonthData(i + 8)?.length }}/{{ item.val }}</span>
					</div>
				</section>
			</div>


			<div class="w-full pt-5 flex gap-2">
				<button ref="btn"
					class="w-full bg-neutral-700 text-white text-lg font-semibold rounded-xl py-2 px-4 hover:bg-neutral-500 border-4 border-neutral-800 relative"
					@click="__.goToApl(next_to_confirm.apl!)">
					<span
						class="absolute -top-3 -right-3 min-w-[30px] flex justify-center items-center rounded-full aspect-square bg-red-400 text-black font-bold text-sm border-2 border-red-600">#{{
							next_to_confirm.index + 1 }}</span>
					<span v-if="!if_hover" class="">Next to Confirm</span>
					<span v-else class="">{{ next_to_confirm.apl!.fullName }}</span>
				</button>
			</div>


		</div>

		<div class="flex w-full">
			<input v-model.trim="search"
				class="w-full h-12 placeholder:text-neutral-400 placeholder:text-[1rem] placeholder:font-semibold placeholder:uppercase tracking-wider font-semibold text-neutral-300 focus:outline-none bg-neutral-800 border-neutral-600 border-2 rounded-xl text-center text-xl"
				placeholder="Search">

			<button v-if="search.length > 0"
				:class="['h-12 bg-neutral-800 border-neutral-600 border-2 rounded-xl text-center font-bold uppercase text-xl aspect-square ml-2 transition-all duration-300 ease-out hover:bg-purple-500']"
				@click="handleSearch">
				Go
			</button>
		</div>

	</div>
</template>

<script setup lang="ts">
import { supabase } from '~/supabase/supabase';
import { useRouter } from 'vue-router';
import { useAppStore } from '~/store/app';
import { storeToRefs } from 'pinia';
import { Applicant } from '~/interfaces/interfaces';

const __ = useAppStore()
const { search, my_apls, profile, monthly_confirmed_apls } = storeToRefs(__)
const router = useRouter()
const apl_count = computed(() => my_apls?.value!.length)
const confirmed_apls = computed(() => my_apls?.value.filter((a: any) => a.pconf_code))
const btn = ref<HTMLButtonElement>()
const if_hover = useElementHover(btn)

onBeforeMount(async () => {
	await __.getMyApls()
	await __.getProfiles()
	__.getMonthlyConfirmedApls()
	if (profile.value) {
		return
	} else {
		await __.getProfile()
	}
})

onMounted(() => {
	let apl = localStorage.getItem('apl')
	if (!apl) return
	if (typeof JSON.parse(apl!) == 'object') __.goToApl(JSON.parse(apl!))
})

function getMonth(num: number) {
	if (num == 8) {
		return "AUG"
	} else if (num == 9) {
		return "SEP"
	} else if (num == 10) {
		return "OCT"
	} else {
		return ''
	}
}

function getMonthData(num: number) {
	if (num == 8) {
		return my_apls.value.filter((a: any) => __.formatToMonth(new Date(a.created_at)) == 'Aug').filter((a: any) => a.pconf_code)
	} else if (num == 9) {
		return my_apls.value.filter((a: any) => __.formatToMonth(new Date(a.created_at)) == 'Sep').filter((a: any) => a.pconf_code)
	} else if (num == 10) {
		return my_apls.value.filter((a: any) => __.formatToMonth(new Date(a.created_at)) == 'Oct').filter((a: any) => a.pconf_code)
	} else {
		return null
	}
}

async function handleLogout() {
	// logout_loading.value = true
	try {
		let { error } = await supabase.auth.signOut()
		if (error) throw error
		router.push('/popup')
	} catch (error: any) {
		console.log(error);
	}
}

const next_to_confirm = computed(() => {
	let index = __.sortByRecency(my_apls.value).reverse().findIndex((apl: Applicant) => !apl.pconf_code)
	let apl = __.sortByRecency(my_apls.value).reverse().find((apl: Applicant) => !apl.pconf_code)
	return { apl: apl, index }
})

async function handleSearch() {
	__.$patch({ results: [] })
	const data = await __.getSearch()
	if (data?.length == 0) await __.getSearch(search.value, 'applicants_ex')
	router.push('/search')
}

</script>

<style scoped></style>