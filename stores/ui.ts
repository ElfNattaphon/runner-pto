import { defineStore } from 'pinia'
export type ToastType = 'success' | 'error' | 'info'
export type Toast = { id: string; type: ToastType; title?: string; message?: string; timeout?: number }
export const useUiStore = defineStore('ui', {
  state: () => ({ toasts: [] as Toast[] }),
  actions: {
    push(toast: Omit<Toast, 'id'>) {
      const id = 't_' + Math.random().toString(36).slice(2, 9)
      const t = { id, timeout: 3000, ...toast }
      this.toasts.push(t)
      if (t.timeout) setTimeout(() => this.remove(id), t.timeout)
      return id
    },
    remove(id: string) { this.toasts = this.toasts.filter(t => t.id !== id) },
    success(msg: string, title = 'สำเร็จ') { this.push({ type: 'success', title, message: msg }) },
    error(msg: string, title = 'ผิดพลาด') { this.push({ type: 'error', title, message: msg, timeout: 5000 }) },
    info(msg: string, title = 'แจ้งเตือน') { this.push({ type: 'info', title, message: msg }) },
  }
})
