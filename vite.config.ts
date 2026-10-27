import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex, escapeSvelte, type MdsvexOptions } from 'mdsvex';
import { createHighlighter } from 'shiki';
const mdsvexOptions: MdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, language) => {
			const lang = language || 'text';
			const highlighter = await createHighlighter({
				themes: ['vesper'],
				langs: ['javascript', 'typescript', 'svelte', 'py', 'python']
			});
			await highlighter.loadLanguage('javascript', 'typescript', 'svelte', 'py', 'python');
			await highlighter.loadTheme('vesper');
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'vesper' }));
			return `{@html \`${html}\` }`;
		}
	}
};
export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
			adapter: adapter({ runtime: 'nodejs24.x' })
		})
	]
});
