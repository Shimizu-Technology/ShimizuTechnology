/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'shimizu-blue': '#1d4ed8', // Just an example; pick your favorite shade
        'shimizu-dark': '#1a1f2e',
      }
    },
  },
  plugins: [],
};
