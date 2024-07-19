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
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			backgroundSize: {
				'200%': '200%',
			},
			animation: {
				answered: 'answered 0.5s cubic-bezier(1,0,.9,1)',
				'button-width': 'width 300ms ease 100ms forwards',
				'button-height': 'height 200ms ease 300ms forwards',
				'button-width2': 'width 100ms ease 500ms forwards',
				'button-height2': 'height 0ms ease 600ms forwards',
				'button-scale': 'scale 300ms ease-in-out 650ms forwards',
			},
			keyframes: {
				answered: {
					from: { 'background-position': '100%' },
					to: { 'background-position': '0%' },
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
