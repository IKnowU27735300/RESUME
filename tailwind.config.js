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
        accentPrimary: '#D4AF37',   // Classic Gold
        accentSecondary: '#C5A021', // Darker Gold
        accentTertiary: '#E6BE8A',  // Pale Gold
        accentQuaternary: '#8B7226', // Bronze/Deep Gold
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
