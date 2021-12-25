<script lang="ts">
	import Header from "./header.svelte";
	import Gallery from "./gallery.svelte";
	import TextGenerator from "./text-generator.svelte";

	export let slides = [];

	let _root: HTMLElement;

	function onUpdate(index: number) {
		const slide = slides[index];
		if (slide) {
			_root.style.setProperty("--gradient-start", slide.gradient[0]);
			_root.style.setProperty("--gradient-end", slide.gradient[1]);
		}
	}
</script>

<div class="app" bind:this={_root}>
	<Header>
		<Gallery {slides} {onUpdate} />
	</Header>
	<main class="app__content">
		<TextGenerator />
	</main>
</div>

<style>
	@property --gradient-start {
		syntax: "<color>";
		inherits: true;
		initial-value: #61bfd9;
	}

	@property --gradient-end {
		syntax: "<color>";
		inherits: true;
		initial-value: #0551b4;
	}

	.app {
		--max-width: 1140px;
		--gradient-start: #61bfd9;
		--gradient-end: #0551b4;

		isolation: isolate;
		background: white;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	}

	.app__content {
		position: relative;
		max-width: var(--max-width);
		margin: auto;
	}
</style>
