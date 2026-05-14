/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        'ink-soft': '#141414',
        'ink-light': '#1a1a1a',
        cream: '#f5f1e8',
        gold: '#c9a961',
        rose: '#8b2c4e',
        burgundy: '#7a1f2b',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant SC"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
