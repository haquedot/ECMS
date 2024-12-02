const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require('tailwindcss-animate')],
});