import { f as defineStore } from './server.mjs';

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
    success(msg, title = "\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08") {
      this.push({ type: "success", title, message: msg });
    },
    error(msg, title = "\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14") {
      this.push({ type: "error", title, message: msg, timeout: 5e3 });
    },
    info(msg, title = "\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19") {
      this.push({ type: "info", title, message: msg });
    }
  }
});

export { useUiStore as u };
//# sourceMappingURL=ui-BVa8d3Kw.mjs.map
