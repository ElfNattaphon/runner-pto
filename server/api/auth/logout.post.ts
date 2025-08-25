export default defineEventHandler((event) => { deleteCookie(event, 'auth', { path: '/' }); return { ok: true } })
