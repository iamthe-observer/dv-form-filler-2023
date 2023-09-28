import { defineStore } from 'pinia'
import { supabase } from '~/supabase/supabase'
import { useRouter } from 'vue-router'
import { Applicant } from '~/interfaces/interfaces'

export const useAppStore = defineStore('app', () => {
  const router = useRouter()
  const profile = ref()
  const search = ref('')
  const results = ref<Applicant[]>([])
  const my_apls = ref<Applicant[]>([])
  const applicant = ref()
  const app_loading = ref(true)
  const monthly_confirmed_apls = reactive([
    { month: 8, val: 0 },
    { month: 9, val: 0 },
    { month: 10, val: 0 },
  ])

  const getProfile = async () => {
    const currentSession = await supabase.auth.getSession()
    const user = currentSession.data.session?.user
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
      if (error) throw error
      profile.value = data![0]
    } catch (error) {
      console.log(error)
    }
  }

  const onInitLoadAppData = async () => {
    try {
      const currentSession = await supabase.auth.getSession()
      console.log(currentSession.data.session)

      if (currentSession.data.session == null) {
        throw currentSession.error
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        const { data: DATA } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
        profile.value = DATA![0]

        router.push('/main')
        await supabase.auth.startAutoRefresh()
        app_loading.value = false
        return user
      }
    } catch (error) {
      router.push('/')
      console.log(error)
      app_loading.value = false
    }
  }

  async function getSearch(
    val: string = search.value,
    table: string = 'applicants'
  ) {
    const value = val.toUpperCase()
    if (value == '') {
      results.value = []
      return
    }
    try {
      const { data, error } = await supabase
        .from(table)
        .select('fullName,aplImg_path,pdob,user_id,apl_id,created_at')
        .ilike('fullName', `%${value}%`)
        .returns<Applicant[]>()
      if (error) throw error
      results.value = data!
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function getApl(id: string, table: string = 'applicants') {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('apl_id', id)
      if (error) throw error
      return data
    } catch (error) {
      console.log(error)
    }
  }

  async function getAplCount() {
    try {
      const { count } = await supabase
        .from('applicants')
        .select('*', { count: 'exact' })
        .eq('user_id', profile.value.id)
      return count
    } catch (error) {
      console.log(error)
    }
  }

  async function getMyApls() {
    try {
      const { data } = await supabase
        .from('applicants')
        .select('*')
        .eq('user_id', profile.value.id)
        .returns<Applicant[]>()
      my_apls.value = data!
      return data
    } catch (error) {
      console.log(error)
    }
  }

  function getMonthlyConfirmedApls() {
    const aug = my_apls.value.filter(
      (apl) => formatToMonth(new Date(apl.created_at!)) == 'Aug'
    )
    const sep = my_apls.value.filter(
      (apl) => formatToMonth(new Date(apl.created_at!)) == 'Sep'
    )
    const oct = my_apls.value.filter(
      (apl) => formatToMonth(new Date(apl.created_at!)) == 'Oct'
    )
    monthly_confirmed_apls[0].val = aug.length
    monthly_confirmed_apls[1].val = sep.length
    monthly_confirmed_apls[2].val = oct.length
  }

  function formatToMonth(date: Date): string {
    return date.toLocaleString('en-US', { month: 'short' })
  }

  function goToApl(apl: Applicant) {
    applicant.value = apl
    router.push('/applicant')
  }

  function sortByRecency(apls: Applicant[]): Applicant[] {
    return apls.sort(
      (a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    )
  }

  const formatDate = (date: Date | null) => {
    if (date == null) {
      return ''
    } else {
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = String(date.getFullYear())

      return `${day}/${month}/${year}`
    }
  }

  function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th'
    }

    const lastDigit = day % 10

    switch (lastDigit) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  function formatDateWords(date: Date): string {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()

    const ordinalSuffix = getOrdinalSuffix(day)
    const formattedDate = `${day}${ordinalSuffix} ${month}, ${year}`

    return formattedDate
  }

  function formatDateTime(date: Date) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return {
    sortByRecency,
    goToApl,
    getMonthlyConfirmedApls,
    monthly_confirmed_apls,
    getProfile,
    getApl,
    my_apls,
    getAplCount,
    getMyApls,
    onInitLoadAppData,
    profile,
    search,
    results,
    getSearch,
    app_loading,
    applicant,
    formatToMonth,
    formatDate,
    formatDateTime,
    formatDateWords,
  }
})
