/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				black: '#121315',
				sidebarBg: '#454f57',
				sidebarElement: '#33393E',
				scramble: '#B8B8B8',
				mobileBg: 'linear-gradient(180deg, #363C41 29.35%, #1F252B 128.76%)'
			},
			fontFamily: {
				inter: 'Inter, sans-serif'
			}
		}
	},
	plugins: []
}
