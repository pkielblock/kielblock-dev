<script lang="ts">
	// The lambda turns red after a failed command, as in the shell prompt this mirrors.
	// `typed` plays the command in key by key (the opening sequence in app.css).
	let {
		command = '',
		failed = false,
		typed = false
	}: { command?: string; failed?: boolean; typed?: boolean } = $props();
</script>

<p class="prompt" class:failed class:typed aria-hidden="true">
	<span class="lambda">λ</span><span>~</span>{#if command}<span>{command}</span
		>{/if}{#if !command || typed}<span class="cursor"></span>{/if}
</p>
