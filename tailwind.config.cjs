import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['index.html', './src/**/*.tsx', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: 'Poppins',
		},
		extend: {},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
