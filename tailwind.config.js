export default {
  darkMode: 'class',
  content: [

    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#06120f",
          card: "#112320",
          accent: "#c7f284",
          text: "#8e9d9b",
          highlight: "#1a322e"
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(199, 242, 132, 0.3)',
      }
    },
  },
  plugins: [],
}
