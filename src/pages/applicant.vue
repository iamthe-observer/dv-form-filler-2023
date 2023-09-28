<template>
	<div class="min-h-[400px]">
		<div class="" @click="$router.back()">back</div>

		{{ applicant }}
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '~/store/app';

const { applicant } = storeToRefs(useAppStore());
</script>

<style scoped></style>