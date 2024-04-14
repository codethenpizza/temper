/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'white': '#FFF',
      'gray': '#F6F6F6',
      'black': '#424242',
      'green': '#25FF90',
      'dark-green': '#1ee580',
      'purple': '#6357b1',
    },
  },
  plugins: [],
}
