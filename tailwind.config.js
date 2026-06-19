/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#000000',
        darkGlass: 'transparent',
        darkBorder: 'rgba(255, 255, 255, 0.1)',
        accentPrimary: '#8052ff',   // Electric Violet
        accentSecondary: '#ffb829', // Warm Yellow Accent
        accentTertiary: '#15846e',  // Switch Teal Accent
        accentQuaternary: '#9a9a9a', // Muted Gray
        // New extreme design colors
        neon: {
          cyan: '#00f0ff',
          magenta: '#ff00ff',
          lime: '#00ff9d',
          pink: '#ff0055',
          orange: '#ff8c00',
          blue: '#0080ff',
        },
        glass: {
          dark: 'rgba(20, 20, 25, 0.4)',
          darker: 'rgba(10, 10, 15, 0.6)',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        decorative: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'gradient-flow': 'gradientFlow 6s ease infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'floatDelayed 4s ease-in-out infinite 1s',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'neon-glow': 'neonGlow 2s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-in-up': 'slideInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        gradientFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatDelayed: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        morph: {
          '0%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '50%': { borderRadius: '70% 30% 46% 54% / 30% 30% 70% 70%' },
          '100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        neonGlow: {
          '0%, 100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor' },
          '50%': { textShadow: '0 0 20px currentColor, 0 0 40px currentColor' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropFilter: {
        'blur-xl': 'blur(20px)',
        'blur-2xl': 'blur(40px)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px #00f0ff, 0 0 40px #00f0ff50',
        'neon-magenta': '0 0 20px #ff00ff, 0 0 40px #ff00ff50',
        'neon-lime': '0 0 20px #00ff9d, 0 0 40px #00ff9d50',
        'neon-pink': '0 0 20px #ff0055, 0 0 40px #ff005550',
        'glow-xl': '0 0 30px rgba(128, 82, 255, 0.3)',
        'glow-2xl': '0 0 60px rgba(128, 82, 255, 0.5)',
      },
      filter: {
        'brightness-75': 'brightness(0.75)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
