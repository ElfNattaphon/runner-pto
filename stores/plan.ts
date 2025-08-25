import { defineStore } from 'pinia'
export type PlanMeta = { distanceKm?: number|null; raceDate?: string|null; goalSeconds?: number|null; longRunDay?: string|null; paces?: any }
export const usePlanStore = defineStore('plan', {
  state: () => ({ workouts: [] as any[], planMeta: {} as PlanMeta }),
  actions: {
    setWorkouts(list: any[]) { this.workouts = list },
    setMeta(meta: PlanMeta) { this.planMeta = { ...this.planMeta, ...meta } },
    clear() { this.workouts = []; this.planMeta = {} as PlanMeta }
  }
})
