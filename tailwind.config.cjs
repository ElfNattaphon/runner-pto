/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        run: { 500:'#a3e635' },
        skyx: {
          50:'#eefaff',100:'#d9f3ff',200:'#b6e8ff',300:'#86d9ff',400:'#53c7ff',
          500:'#00b3ff',600:'#0ea5e9',700:'#0284c7',800:'#0369a1',900:'#0b4f7a'
        },
        ink: { 900:'#0b1220', 800:'#0f172a', 700:'#111827' }
      },
      boxShadow: { soft: '0 10px 25px -12px rgba(0,0,0,0.25)' },
      backgroundImage: {
        'run-gradient': 'linear-gradient(135deg, #0b1220 0%, #0f172a 40%, #0b4f7a 100%)',
        'track-lines': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 160 160\" opacity=\"0.08\"><defs><pattern id=\"p\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"><path d=\"M0 20h40M20 0v40\" stroke=\"white\" stroke-width=\"1\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23p)\"/></svg>')"
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
