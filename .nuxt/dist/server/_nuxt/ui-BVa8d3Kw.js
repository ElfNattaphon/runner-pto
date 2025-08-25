import { f as defineStore } from "../server.mjs";
const useUiStore = defineStore("ui", {
  state: () => ({ toasts: [] }),
  actions: {
    push(toast) {
      const id = "t_" + Math.random().toString(36).slice(2, 9);
      const t = { id, timeout: 3e3, ...toast };
      this.toasts.push(t);
      if (t.timeout) setTimeout(() => this.remove(id), t.timeout);
      return id;
    },
    remove(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    success(msg, title = "สำเร็จ") {
      this.push({ type: "success", title, message: msg });
    },
    error(msg, title = "ผิดพลาด") {
      this.push({ type: "error", title, message: msg, timeout: 5e3 });
    },
    info(msg, title = "แจ้งเตือน") {
      this.push({ type: "info", title, message: msg });
    }
  }
});
export {
  useUiStore as u
};
//# sourceMappingURL=ui-BVa8d3Kw.js.map
