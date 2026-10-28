import { derived, writable } from 'svelte/store';
import portuguese from './pt-BR.json';
import english from './en.json';

export type Locale = 'en' | 'pt-BR';
export const locale = writable<Locale>('en');
export const languageKey = 'portfolio-language';

export function preferredLocale(saved: string | null, languages: readonly string[]): Locale {
	if (saved === 'en' || saved === 'pt-BR') return saved;
	return languages[0]?.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
}

export const t = derived(
	locale,
	(language) => (text: string) =>
		((language === 'pt-BR' ? portuguese : english) as Record<string, string>)[text] ?? text
);

export function selectLanguage(language: Locale) {
	locale.set(language);
	try {
		localStorage.setItem(languageKey, language);
	} catch {
		// Keep the selection usable when browser storage is unavailable.
	}
}
