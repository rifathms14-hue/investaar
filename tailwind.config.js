/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
        serif: ['Figtree', 'sans-serif'],
        mono: ['Figtree', 'sans-serif'],
      },
      colors: {
        base: '#0D0D0D',
        surface: '#1A1A1A',
        'surface-elevated': '#242424',
        border: '#2A2A2A',
        gold: '#D4AF37',
        'gold-light': '#E5C65C',
        violet: '#7C3AED',
        'violet-light': '#8B5CF6',
        success: '#22C55E',
      },
      borderRadius: {
        'sharp': '0',
        'xs': '1px',
        'sm': '2px',
      },
      boxShadow: {
        'glow-gold': '0 0 24px rgba(212, 175, 55, 0.2)',
        'glow-violet': '0 0 24px rgba(124, 58, 237, 0.2)',
        'card': '0 4px 20px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
