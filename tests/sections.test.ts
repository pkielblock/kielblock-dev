import { expect, test } from 'bun:test';
import { sectionOf } from '../src/lib/sections';

test.each([
	['', 'overview'],
	['about', 'about'],
	['courses', 'learning'],
	['journal', 'journal'],
	['journal/about-me', 'journal'],
	['constructor', 'overview'],
	['main', 'overview']
])('fragment "%s" opens %s', (hash, section) => {
	expect(sectionOf(hash)).toBe(section);
});
