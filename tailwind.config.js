/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-left': 'slide-left 20s linear infinite',
        // 'fade-in': 'fadeIn 0.1s ease-out',
        // 'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-up': 'scaleUp 0.5s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 15s ease-in-out infinite',
        'wave-slow': 'wave 20s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'spin-slow-reverse': 'spin 12s linear infinite reverse',

      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25px)' },
        },
      },
      colors: {
        jain: {
          white: '#FFFFFF',
          red: '#FF4136',
          yellow: '#FFDC00',
          green: '#2ECC40',
          black: '#111111',
        },
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        hindi: ['Noto Sans Devanagari', ...fontFamily.sans],
        
      },
    },
  },
  plugins: [],
};
