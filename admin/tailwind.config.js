/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        background: '#121212',
        surface: '#1E1E1E',
        primary: '#4A90E2',
        secondary: '#2A9D8F',
        accent: '#1E3A5F',
        textPrimary: '#E0E0E0',
        textSecondary: '#A0A0A0',
        error: '#D32F2F',
      },
    },
  },
  plugins: [],
}