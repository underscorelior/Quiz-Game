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
			animation: { answered: 'answered 0.5s cubic-bezier(1,0,.9,1)' },
			keyframes: {
				answered: {
					from: { 'background-position': '100%' },
					to: { 'background-position': '0%' },
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
