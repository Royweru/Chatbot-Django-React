/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
     "./src/**/*.{ts,tsx,js,jsx}"
    ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
      fontFamily:{
        jersey:'var(--font-jersey)',
        poppins:'var(--font-poppins)',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

