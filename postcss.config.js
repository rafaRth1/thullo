import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.js';

console.log(tailwindConfig);

export default {
	plugins: [tailwind(tailwindConfig), autoprefixer],
};
