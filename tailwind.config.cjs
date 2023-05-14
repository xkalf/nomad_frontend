/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		height: theme => ({
			auto: 'auto',
			...theme('spacing'),
			full: '100%',
			screen: '100dvh'
		}),
		minHeight: theme => ({
			0: '0',
			...theme('spacing'),
			full: '100%',
			screen: '100svh'
		}),
		extend: {
			colors: {
				primary: 'var(--primary-color)',
				secondary: 'var(--secondary-color)',
				sidebar: 'var(--sidebar-color)',
				background: 'var(--background-color)'
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
