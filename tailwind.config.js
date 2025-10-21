const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				'sans': ['"Poppins"', ...defaultTheme.fontFamily.sans],
			},
			container: {
				center: 'true',
				padding: '1rem'
			},
			zIndex: {
				'100': '100',
				'1030': '1030'
			},
			minWidth: {
				'350': '21.875rem',
				'500': '31.25rem'
			},
			width: {
				'350': '21.875rem',
				'500': '31.25rem'
			},
			minHeight: {
				'350': '21.875rem',
				'500': '31.25rem'
			},
			height: {
				'350': '21.875rem',
				'500': '31.25rem'
			},

		},
		keyframes: {
			slideDownAndFade: {
				from: { opacity: "0", transform: "translateY(-2px)" },
				to: { opacity: "1", transform: "translateY(0)" },
			},
			slideLeftAndFade: {
				from: { opacity: "0", transform: "translateX(2px)" },
				to: { opacity: "1", transform: "translateX(0)" },
			},
			slideUpAndFade: {
				from: { opacity: "0", transform: "translateY(2px)" },
				to: { opacity: "1", transform: "translateY(0)" },
			},
			slideRightAndFade: {
				from: { opacity: "0", transform: "translateX(-2px)" },
				to: { opacity: "1", transform: "translateX(0)" },
			},
		},
		animation: {
			slideDownAndFade:
				"slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
			slideLeftAndFade:
				"slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
			slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
			slideRightAndFade:
				"slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
		},
	},
	plugins: [require("tailwindcss-animate")],
}