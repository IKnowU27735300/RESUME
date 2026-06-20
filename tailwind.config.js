/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#050505',
        darkGlass: 'rgba(255, 255, 255, 0.05)',
        darkBorder: 'rgba(255, 255, 255, 0.1)',
        accentPrimary: '#000000',   // Black
        accentSecondary: '#333333', // Dark Gray
        accentTertiary: '#666666',  // Medium Gray
        accentQuaternary: '#999999', // Light Gray
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        decorative: ['"Cinzel Decorative"', 'cursive'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
