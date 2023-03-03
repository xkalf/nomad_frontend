/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		height: theme => ({
			auto: 'auto',
			...theme('spacing'),
			full: '100%',
			screen: '100svh'
		}),
		minHeight: theme => ({
			0: '0',
			...theme('spacing'),
			full: '100%',
			screen: '100svh'
		}),
		extend: {
			colors: {
				black: '#121315',
				sidebarBg: '#454f57',
				sidebarElement: '#33393E',
				scramble: '#B8B8B8',
				mainBg: '#363C41'
			},
			fontFamily: {
				inter: 'Inter, sans-serif'
			},
			keyframes: {
				rotate: {
					'0%': { transform: 'rotate(0deg)' },
					'70%, 100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				rotate: 'rotate 2s ease-in-out infinite 2s'
			}
		}
	},
	plugins: []
}
