<template>
	<div class="min-h-fit w-full p-2 bg-black">
		<div class="w-full  border-2 border-neutral-500 bg-neutral-900 rounded-xl p-2">

			<div class="flex gap-1 w-full items-center justify-between px-2">
				<div class="flex items-center gap-1">
					<span class="cursor-pointer hover:underline hover:uppercase" @click="handleGoingHome">home</span>
				</div>

				<div class="text-end font-bold text-xl" v-if="apl_idx == 0">{{ apl_idx == 0 ? 'Primary Applicant' : '' }}</div>
				<div class="text-end font-bold text-xl" v-else-if="apl_idx == 1">{{ apl_idx == 1 ? 'Secondary Applicant' : '' }}
				</div>
				<div class="text-end font-bold text-xl" v-else-if="apl_idx + ward_idx >= 2">{{ apl_idx >= 2 ? `Ward
					Applicant ${apl_idx - 1}` :
					'' }}
				</div>
			</div>

			<div class="flex w-full p-2 gap-2">

				<div class="w-1/2 flex flex-col gap-2 aspect-square bg-black rounded-xl p-2 relative">
					<div v-if="src" s class="indicator w-full h-full">
						<span
							class="indicator-item indicator-center badge bg-purple-500 border-none shadow-lg text-black font-bold">{{
								names }}</span>
						<img :src="src" alt="" class="w-full h-full object-cover rounded-lg">
					</div>
					<div v-else class="w-full h-full grid place-items-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-14 aspect-square" viewBox="0 0 24 24">
							<path fill="currentColor"
								d="M19.5 10.925L18.1 12.3q-.275.275-.688.288T16.7 12.3q-.275-.275-.275-.7t.275-.7l1.375-1.4L16.7 8.125q-.275-.275-.275-.687t.275-.713q.3-.3.713-.3t.712.3L19.5 8.1l1.375-1.4q.275-.3.687-.3t.713.3q.3.3.3.713t-.3.712L20.9 9.5l1.4 1.4q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288L19.5 10.925ZM9 12q-1.65 0-2.825-1.175T5 8q0-1.65 1.175-2.825T9 4q1.65 0 2.825 1.175T13 8q0 1.65-1.175 2.825T9 12Zm-8 6v-.8q0-.85.438-1.563T2.6 14.55q1.55-.775 3.15-1.163T9 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.588 1.413T15 20H3q-.825 0-1.413-.588T1 18Z" />
						</svg>
					</div>

					<a :href="url" :download="type"
						class="w-full font-bold rounded-lg bg-neutral-900 hover:bg-amber-600 hover:text-black text-center">Download</a>

					<div v-if="apl_idx !== 0" @click="prevPic"
						class="absolute -left-1 top-1/2 -translate-y-1/2 w-6 aspect-square bg-purple-600 rounded-full grid place-items-center font-bold text-black cursor-pointer hover:bg-purple-500 select-none">
						&lt; </div>
					<div v-if="apl_idx !== family_number" @click="nextPic"
						class="absolute -right-1 top-1/2 -translate-y-1/2 w-6 aspect-square bg-purple-600 rounded-full grid place-items-center font-bold text-black cursor-pointer hover:bg-purple-500 select-none">
						></div>
				</div>

				<div class="w-1/2 flex flex-col gap-1">
					<p class="flex-1 bg-black rounded-lg flex justify-between items-center px-2 font-bold gap-1">
						<span>Name:</span>
						<span class="w-full truncate text-right"> {{ apl?.fullName }}
						</span>
					</p>
					<p class="flex-1 bg-black rounded-lg flex justify-between items-center px-2 font-bold">
						<span>DOB:</span>
						<span> {{ __.formatDate(new
							Date(apl?.pdob!))
						}}
						</span>
					</p>
					<p class="flex-1 bg-black rounded-lg flex justify-between items-center px-2 font-bold">
						<span>Created:</span>
						<span> {{ __.formatDate(new
							Date(apl?.created_at!)) }}
						</span>
					</p>
					<p class="flex-1 bg-black rounded-lg flex justify-between items-center px-2 font-bold">
						<span>MS:</span>
						<span> {{ apl?.pmarital_status }}
						</span>
					</p>
					<p class="flex-1 bg-black rounded-lg flex justify-between items-center px-2 font-bold">
						<span>Children:</span>
						<span> {{ apl?.children_number
						}}
						</span>
					</p>
					<p class="flex-1 bg-black rounded-lg flex justify-between items-center px-2 font-bold">
						<span>Applied By:</span>
						<span> {{ profiles?.find(p => p.id == apl?.user_id)?.fullname
						}}
						</span>
					</p>
				</div>
			</div>

			<div v-if="apl?.pconf_code" class="w-full py-2 px-2">
				<div
					class="w-full text-center font-bold uppercase text-xs bg-green-600 text-black border-2 border-green-700 rounded-xl py-1">
					Registered
				</div>
			</div>
			<div v-if="apl?.pconf_code" class="w-full py-2 px-2">
				<div @click="handleFill"
					class="cursor-pointer hover:bg-purple-500 w-full text-center font-bold uppercase text-xl bg-purple-600 text-black border-2 border-purple-700 rounded-xl py-2">
					Fill to Check Results
				</div>
			</div>
			<div v-else class="w-full py-2 px-2">
				<div @click="handleFill"
					class="cursor-pointer hover:bg-purple-500 w-full text-center font-bold uppercase text-xl bg-purple-600 text-black border-2 border-purple-700 rounded-xl py-2">
					Fill to Register
				</div>
			</div>

			<div v-if="conf_code && !apl?.pconf_code" class="w-full py-2 px-2">
				<div
					class="cursor-pointer hover:bg-amber-500 w-full text-center font-bold uppercase text-xl bg-amber-600 text-black border-2 border-amber-700 rounded-xl py-2"
					@click="async () => await handleUpdateConfCode()">
					Save Confirmation Code<br />
					{{ conf_code }}
				</div>
			</div>


		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '~/store/app';
import { supabase } from '~/supabase/supabase';

const __ = useAppStore()
const src = ref('')
const { applicant: apl, profiles } = storeToRefs(useAppStore());
const router = useRouter()
const url = ref('')
const type = ref<'prime.jpg' | 'sec.jpg' | 'wards.jpg'>('prime.jpg')
const apl_idx = ref(0)
const ward_idx = ref(0)
const conf_code = ref('')
const loading = ref(false)

onMounted(() => {
	checkForConfPage()
})

function checkForConfPage() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id!,
			{ page: 'conf' },
			function (response) {
				if (response) {
					conf_code.value = response
				}
			}
		)
	})
}

// function sendMsg(msg: any) {
// 	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
// 		chrome.tabs.sendMessage(tabs[0].id!, { action: msg })
// 	})
// }

const handleUpdateConfCode = async () => {
	loading.value = true
	try {
		const { data: appl, error: err } = await supabase
			.from('applicants')
			.select('apl_id')
			.eq('apl_id', apl.value?.apl_id)
		if (err) throw err

		const { data, error } = await supabase.from(appl.length == 0 ? 'applicants_ex' : 'applicants')
			.update({ pconf_code: conf_code.value })
			.eq('apl_id', apl.value!.apl_id)
			.select()
		if (error) throw error
		alert('Saved Confirmation Code!')
		loading.value = false
		localStorage.removeItem('apl')
		router.push('/main')
		return data
	} catch (error) {
		loading.value = false
		console.log(error)
	}
}

const names = computed(() => {
	if (apl_idx.value == 0) return apl.value?.pfirstName
	if (apl_idx.value == 1) return apl.value?.sfirstName
	if (apl_idx.value >= 2) return apl.value?.wards[apl_idx.value - 2].wfirstName
})

const family_number = computed(() => {
	let num = 0
	num += apl.value!.wards.length
	if (apl.value!.slastName) num++
	return num
})

async function nextPic() {
	apl_idx.value++
	let path: string

	if (apl_idx.value == 1) {
		path = apl.value!.aplImg_path.secPath[0]
		type.value = 'sec.jpg'
	} else if (apl_idx.value >= 2) {
		path = apl.value!.aplImg_path.wardsPath[apl_idx.value - 2]
		type.value = 'wards.jpg'
	} else {
		path = apl.value!.aplImg_path.primePath[0]
		type.value = 'prime.jpg'
	}

	try {
		let { data, error } = await supabase.storage.from('applicants').createSignedUrl(path, 10)
		if (error) throw error
		src.value = data!.signedUrl
	} catch (error) {
		console.log(error)
		src.value = ''
	}

	const URL = await __.downloadIMG(path)
	url.value = URL!
}

async function prevPic() {
	if (apl_idx.value == 0) return
	apl_idx.value--
	let path: string

	if (apl_idx.value == 1) {
		path = apl.value!.aplImg_path.secPath[0]
		type.value = 'sec.jpg'
	}
	else if (apl_idx.value >= 2) {
		path = apl.value!.aplImg_path.wardsPath[apl_idx.value - 2]
		type.value = 'wards.jpg'
	}
	else {
		path = apl.value!.aplImg_path.primePath[0]
		type.value = 'prime.jpg'
	}

	try {
		let { data, error } = await supabase.storage.from('applicants').createSignedUrl(path, 10)
		if (error) throw error
		src.value = data!.signedUrl
	} catch (error) {
		console.log(error)
		src.value = ''
	}

	const URL = await __.downloadIMG(path)
	url.value = URL!
}

onMounted(async () => {
	try {
		let { data, error } = await supabase.storage.from('applicants').createSignedUrl(apl.value!.aplImg_path.primePath[0], 10)
		if (error) throw error
		src.value = data!.signedUrl
	} catch (error) {
		console.log(error)
		src.value = ''
	}

	const URL = await __.downloadIMG(apl.value!.aplImg_path.primePath[0])
	// alert(URL);
	url.value = URL!

})

function handleGoingHome() {
	localStorage.removeItem('apl')
	router.push('/main')
}

function handleFill() {
	chrome.tabs.query(
		{ active: true, currentWindow: true },
		function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id!, {
				apl: apl.value
			});
		});
}

</script>

<style scoped></style>