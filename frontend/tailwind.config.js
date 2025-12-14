/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
      // 1. Fonts
        fontFamily: {
        sekuya: ['"Sekuya"', 'serif'], 
        },
      // 2. Keyframes (MUST be inside 'extend')
        keyframes: {
        shine: {
            '0%': { 'background-position': '100%' },
            '100%': { 'background-position': '-100%' },
        },
        },
      // 3. Animation (MUST be inside 'extend')
        animation: {
        shine: 'shine 5s linear infinite',
        },
    },
    },
    plugins: [],
}