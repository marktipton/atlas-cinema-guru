/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: '#00003C',
        teal: '#54F4D0',
        darkTeal: '#1DD2AF',
        searchBlue: '#000061',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
