/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
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
	},
	plugins: [],
}