/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#1a1a1a', // 高端黑
				secondary: '#c0a080', // 奢华金/木色调
				accent: '#f4f4f4',
			},
			fontFamily: {
				sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
				serif: ['"Playfair Display"', 'Merriweather', 'Georgia', 'serif'],
				script: ['"Pinyon Script"', 'cursive'],
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
