import { describe, expect, test } from 'bun:test';
import { get } from 'svelte/store';
import { locale, preferredLocale, t } from '../src/lib/i18n/index';
import english from '../src/lib/i18n/en.json';
import portuguese from '../src/lib/i18n/pt-BR.json';

describe('language selection', () => {
	test.each([
		[null, ['pt-BR'], 'pt-BR'],
		[null, ['pt-PT'], 'pt-BR'],
		[null, ['en-US'], 'en'],
		[null, ['fr-FR', 'pt-BR'], 'en'],
		[null, [], 'en'],
		['en', ['pt-BR'], 'en'],
		['pt-BR', ['en-US'], 'pt-BR'],
		['invalid', ['pt-BR'], 'pt-BR']
	] as const)('saved %s with browser %s chooses %s', (saved, languages, expected) => {
		expect(preferredLocale(saved, languages)).toBe(expected);
	});

	test('both catalogs cover the same messages and switches update translations', () => {
		expect(Object.keys(portuguese).sort()).toEqual(Object.keys(english).sort());
		locale.set('pt-BR');
		expect(get(t)('Copy email address')).toBe('Copiar endereço de e-mail');
		locale.set('en');
		expect(get(t)('Copy email address')).toBe('Copy email address');
	});
});
