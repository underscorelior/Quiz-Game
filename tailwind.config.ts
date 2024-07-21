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
				answered: 'answered 0.55s ease-in-out',
				shake: 'shake 1s ease 0.5s',
				'correct-unsel': 'correct_unsel 0.5s ease',
			},
			keyframes: {
				answered: {
					from: { 'background-position': '95%' },
					'65%': { transform: 'scale(1.025)' },
					'80%': { 'background-position': '0%' },
					to: { transform: 'scale(1)' },
				},
				correct_unsel: {
					from: { 'background-position': '95%' },
					'20%': { 'background-position': '95%' },
					to: { 'background-position': '0%' },
				},
				shake: {
					'10%, 90%': {
						transform: 'translate3d(-1px, 0, 0)',
					},
					'20%, 80%': {
						transform: 'translate3d(2px, 0, 0)',
					},
					'30%, 50%, 70%': {
						transform: 'translate3d(-3px, 0, 0)',
					},
					'40%, 60%': {
						transform: 'translate3d(3px, 0, 0)',
					},
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
