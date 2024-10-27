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
      colors: {
        jain: {
          white: '#FFFFFF',
          red: '#FF4136',
          yellow: '#FFDC00',
          green: '#2ECC40',
          black: '#111111',
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
