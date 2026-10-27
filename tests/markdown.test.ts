import { describe, expect, test } from 'bun:test';
import { renderMarkdown } from '../src/lib/utils';

describe('renderMarkdown', () => {
	test('preserves Markdown formatting and safe links', () => {
		const html = renderMarkdown('**Hello** [site](https://example.com)');
		expect(html).toContain('<strong>Hello</strong>');
		expect(html).toContain('<a href="https://example.com">site</a>');
	});

	test('removes scripts, event handlers, and unsafe link protocols', () => {
		const html = renderMarkdown(
			'<script>alert(1)</script><a href="javascript:alert(1)" onclick="alert(1)">link</a><img src=x onerror="alert(1)">'
		);
		expect(html).not.toMatch(/script|onclick|onerror|javascript:/i);
		expect(html).toContain('link');
	});
});
