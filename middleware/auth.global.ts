export default defineNuxtRouteMiddleware(async (to) => {
  const publicPages = ['/login', '/register']
  if (publicPages.includes(to.path)) return

  try {
    const headers = process.client ? undefined : { cookie: useRequestHeaders(['cookie']).cookie || '' }
    const me = await $fetch('/api/auth/me', { headers })
    const userStore = useUserStore()
    userStore.setUser(me)

    // Load latest plan on SSR/CSR to persist after refresh
    const planStore = usePlanStore()
    if (!planStore.workouts.length) {
      try {
        const latest:any = await $fetch('/api/plan/latest', { headers })
        if (latest?.workouts) planStore.setWorkouts(latest.workouts); if (latest?.meta) planStore.setMeta(latest.meta)
      } catch {}
    }
  } catch (e: any) {
    // only redirect on explicit 401
    if (e?.statusCode === 401) return navigateTo('/login')
  }
})
