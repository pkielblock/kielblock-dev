import { error, redirect } from '@sveltejs/kit';

const posts = import.meta.glob('/src/content/*.md');

export function GET({ params }) {
	if (!Object.hasOwn(posts, `/src/content/${params.slug}.md`)) error(404, 'Not Found');
	redirect(308, '/#journal/' + params.slug);
}
