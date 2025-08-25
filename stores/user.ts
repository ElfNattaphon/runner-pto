import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({ user: null as any }),
  actions: { setUser(u: any) { this.user = u } }
})
