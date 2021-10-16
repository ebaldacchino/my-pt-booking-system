const colors = require('tailwindcss/colors');

module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			title: ['Kanit', 'Helvetica', 'Arial', 'sans-serif'],
			sans: ['Josefin Sans', 'Helvetica', 'Arial', 'sans-serif'],
		},
		extend: {
			cursor: {
				grabbing: 'grabbing',
			},
			width: {
				fit: 'fit-content',
				'1/7': '14.2857%',
				'1/8': '12.5%',
			},
			minWidth: {
				'1/3': '33.3333%',
				'1/4': '25%',
				'1/5': '20%',
				'1/6': '16.6667%',
				'1/7': '14.2857%',
				'1/8': '12.5%',
				'1/11': '9.0909%',
			},
			borderWidth: {
				3: '3px',
			},
			zIndex: {
				'-10': '-10',
			},
			colors: {
				teal: colors.teal,
				cyan: colors.cyan,
				sky: colors.sky,
			},
			scale: {
				99: '0.99',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
