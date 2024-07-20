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
				answered: 'answered 0.65s ease-in-out',
			},
			keyframes: {
				answered: {
					from: { 'background-position': '95%' },
					'65%': { transform: 'scale(1.025)' },
					'80%': { 'background-position': '0%' },
					to: { transform: 'scale(1)' },
				},
			},
			borderWidth: {
				3: '3px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
