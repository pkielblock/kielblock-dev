declare module '*.md' {
	import type { ComponentType } from 'svelte';
	import type { Post } from '#lib/types.js';
	export const metadata: Omit<Post, 'slug'>;
	const component: ComponentType;
	export default component;
}
