<script setup lang="ts">
import { useAppStore } from '../store/app';
// import { useRouter } from 'vue-router'

onMounted(async () => {
  // const router = useRouter();
  // router.push('/main')
  await useAppStore().onInitLoadAppData();
  console.log(useAppStore().profile);

})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
