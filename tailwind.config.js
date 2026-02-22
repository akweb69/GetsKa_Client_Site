/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6B21E8',
        'primary-hover': '#5B18C4',
        'primary-light': '#EEF0FF',
        'primary-mid': '#E8E4FF',
        navy: '#0D0D2B',
        'navy-light': '#1a1a3e',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
