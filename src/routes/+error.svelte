<script lang="ts">
	import { page } from '$app/state';
	import { t } from '#lib/i18n/index.js';
	import Prompt from '#lib/components/Prompt.svelte';
</script>

<svelte:head>
	<title>{page.status} | Pedro Kielblock</title>
</svelte:head>

<div class="output">
	<Prompt command={'cat ' + page.url.pathname} />
	<div class="result doc">
		<h1>
			cat: {page.url.pathname}: {page.status === 404
				? $t('No such file or directory')
				: page.error?.message}
		</h1>
		<p><a href="/">{$t('Back to home')}</a></p>
	</div>
	<Prompt failed />
</div>
