<script setup lang="ts">
import * as $ from '~/supabase/supabase'
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '../../store/app';
import { storeToRefs } from 'pinia'

const { app_loading } = storeToRefs(useAppStore())
const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()

console.log(route.path)
const loading = ref<boolean>(false)
const errMsg = ref<string>('')

// async function loginUser() {
//   router.push('/main')
// }

async function loginUser() {
  loading.value = true
  if ((!email.value || !password.value) && (email.value.includes('@'))) {
    loading.value = false
    return errMsg.value = 'Enter Correct Credentials!'
  }

  try {
    let { error } = await $.supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    console.log('Logged In!')
    loading.value = false

    const { data: { user } } = await $.supabase.auth.getUser()

    // let { data } = await $.supabase.from('restricted_users').select('*')
    // if (data?.some(USER => USER.user_id == user?.id)) {
    //   await $.supabase.auth.signOut()
    //   alert('Bad Login')
    //   return
    //   // return useAppStore().$patch({ restricted_user: true })
    // } else {
    //   // useAppStore().$patch({ restricted_user: false })
    // }


    let { data: DATA } = await $.supabase.from('profiles').select('*').eq('id', user?.id)
    useAppStore().$patch({ profile: DATA![0] })
    console.log(DATA);

    // if (!DATA![0].role && useNuxtApp().$mobileCheck()) {
    //   alert('Open site on a computer to continue!...')
    //   await $.supabase.auth.signOut()
    //   return useNuxtApp().$router.push('/')
    // }

    // if (DATA![0].role && useNuxtApp().$mobileCheck()) {
    // 	useNuxtApp().$router.push('/analytics')
    // } else if (DATA![0].role && !useNuxtApp().$mobileCheck()) {
    // 	useNuxtApp().$router.push('/dashboard')
    // } else {
    router.push('/main')
    // }

    // emit('login')
    return true
  } catch (err: any) {
    errMsg.value = err.message
    console.log(errMsg.value);

    setTimeout(() => {
      errMsg.value = ''
    }, 4000)
    alert(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="app_loading" class=" flex w-full h-full justify-center items-center bg-neutral-900 min-h-[400px]">
    <Loader />
  </div>

  <div v-else class="flex flex-col min-h-[400px] items-center gap-2 w-full bg-black text-white rounded-md p-3">

    <div
      class="flex items-center justify-center w-full min-h-fit bg-neutral-800 rounded-2xl border border-2 border-neutral-700">
      <RandomText :idx="0" class="text-3xl font-bold uppercase text-neutral-300 py-3" ctnt="DV Form Filler" :speed="6">
      </RandomText>
    </div>

    <form
      class="flex flex-col p-3 w-full h-full flex-1 h-4 bg-neutral-800 rounded-2xl border border-2 border-neutral-700 gap-2"
      @submit.prevent="loginUser">
      <RandomText :idx="2" class="text-lg text-neutral-400 mx-auto pb-5" :speed="6"
        ctnt="Enter Credentials for EG-Datapoint">
      </RandomText>

      <input v-model="email" type="email"
        class="w-full tracking-wider font-bold h-14 rounded-xl text-center bg-black border-none focus:outline-none"
        placeholder="Email">
      <input v-model="password" type="password"
        class="w-full font-bold h-14 rounded-xl text-center bg-black border-none focus:outline-none"
        placeholder="Password">
      <div class="flex-1 flex justify-center items-center h-14">
        <Button_>
          <RandomText :idx="3" class="text-lg font-bold" :speed="20" :increment="10" ctnt="Sign In">
          </RandomText>
        </Button_>
      </div>
    </form>

  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
