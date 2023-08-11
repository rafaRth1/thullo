import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.js';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss,
	},
	resolve: {
		alias: {
			'@context': path.resolve(__dirname, './src/context'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@interfaces': path.resolve(__dirname, './src/interfaces'),
			'@redux': path.resolve(__dirname, './src/redux'),
		},
	},
});
