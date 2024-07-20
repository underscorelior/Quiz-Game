import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundSize: {
				'200%': '200%',
				'300%': '300%',
			},
			animation: {
				answered: 'answered 0.75s ease-in-out',
				'button-scale': 'scale 300ms ease-in-out 550ms forwards',
				'button-width': 'width 300ms ease 100ms forwards',
				'button-height': 'height 200ms ease 300ms forwards',
				'button-width2': 'width 100ms ease 500ms forwards',
				'button-height2': 'height 0ms ease 600ms forwards',
			},
			keyframes: {
				answered: {
					from: { 'background-position': '95%' },
					'80%': { transform: 'scale(1.025)', 'background-position': '0%' },
					to: { transform: 'scale(1)' },
				},
				width: {
					'0%': { width: '0' },
					'100%': { width: '100%' },
				},
				height: {
					'0%': { height: '0' },
					'100%': { height: '100%' },
				},
				scale: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
