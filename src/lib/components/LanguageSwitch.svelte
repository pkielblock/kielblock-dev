<script lang="ts">
	import { locale, selectLanguage } from '#lib/i18n/index.js';
</script>

<div class="language-switch" role="group" aria-label={$locale === 'pt-BR' ? 'Idioma' : 'Language'}>
	<button
		type="button"
		lang="en"
		aria-label="English"
		aria-pressed={$locale === 'en'}
		onclick={() => selectLanguage('en')}>EN</button
	>
	<button
		type="button"
		lang="pt-BR"
		aria-label="Português"
		aria-pressed={$locale === 'pt-BR'}
		onclick={() => selectLanguage('pt-BR')}>PT</button
	>
</div>
