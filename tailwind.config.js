const colors = require('tailwindcss/colors');

module.exports = {
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			title: ['Kanit', 'Helvetica', 'Arial', 'sans-serif'],
			sans: ['Josefin Sans', 'Helvetica', 'Arial', 'sans-serif'],
		},
		extend: { 
			colors: {
				teal: colors.teal,
				cyan: colors.cyan,
				sky: colors.sky,
			}, 
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
