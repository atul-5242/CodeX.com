/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'red-hat': ['"Red Hat Display"', 'serif'], 
        'handlee': ['"Handlee"', 'serif'], 
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), 
  ],
};
