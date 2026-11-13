export const sections = ['overview', 'about', 'experience', 'learning', 'contact', 'journal'];
export const learningCategories = ['education', 'certifications', 'courses'];

/** The tab a URL fragment belongs to; anything unknown opens the overview. */
export function sectionOf(hash: string): string {
	if (hash === 'journal' || hash.startsWith('journal/')) return 'journal';
	if (learningCategories.includes(hash)) return 'learning';
	return sections.includes(hash) ? hash : 'overview';
}
