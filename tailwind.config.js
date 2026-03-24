/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f0f13',
        darkGlass: 'rgba(255, 255, 255, 0.05)',
        darkBorder: 'rgba(255, 255, 255, 0.1)',
        accentPrimary: '#00f0ff',
        accentSecondary: '#bc13fe',
        accentTertiary: '#00ff9d',
        accentQuaternary: '#ff0055',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
