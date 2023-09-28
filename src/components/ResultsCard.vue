<template>
	<div @click="goToApl" class="bg-neutral-800 p-2 cursor-pointer">
		{{ result.fullName }}
		{{ result.apl_id }}
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/store/app'
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps<{
	result: any
}>()

const goToApl = async () => {
	const apl = await useAppStore().getApl(props.result.apl_id)
	useAppStore().$patch({ applicant: apl ? apl![0] : null })
	router.push('/applicant')
}
</script>

<style scoped></style>