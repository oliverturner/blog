<script lang="ts">
	import { onMount } from "svelte";

	import { jeffsum } from "./quotes";
	import Header from "./header.svelte";
	import Gallery from "./gallery.svelte";
	import TextGenerator from "./text-generator.svelte";

	export let slides = [];

	let _root: HTMLElement;
	let _sentences = [];

	function onUpdate(index: number) {
		const slide = slides[index];
		if (slide) {
			_root.style.setProperty("--gradient-start", slide.gradient[0]);
			_root.style.setProperty("--gradient-end", slide.gradient[1]);
		}
	}

	function fetchParas({ paras }: { paras: number }) {
		_sentences = jeffsum(paras);
	}

	onMount(async () => {
		if ("registerProperty" in CSS === false) {
			console.warn("CSS Variables are not supported in this browser");
			await import("https://unpkg.com/css-paint-polyfill");
		}

		CSS.registerProperty({
			name: "--gradient-start",
			syntax: "<color>",
			inherits: true,
			initialValue: "#61bfd9",
		});

		CSS.registerProperty({
			name: "--gradient-end",
			syntax: "<color>",
			inherits: true,
			initialValue: "#0551b4",
		});
	});
</script>

<div class="app" bind:this={_root}>
	<Header>
		<Gallery {slides} {onUpdate} />
	</Header>
	<main class="app__content">
		<TextGenerator onSubmit={fetchParas} />
		<div class="sentences">
			{#each _sentences as sentence}
				<p>{sentence}</p>
			{/each}
		</div>
	</main>
</div>

<style>
	.app {
		--max-width: 1140px;
		--text1: #000;
		--text2: #000;
		--gradient-start: #61bfd9;
		--gradient-end: #0551b4;

		min-height: 100%;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		background: white;
	}

	.app__content {
		display: grid;
		align-items: start;

		position: relative;
		max-width: var(--max-width);
		margin: auto;
	}

	.sentences {
		width: 50%;
		margin: 2rem auto;
		color: var(--text2);
	}
</style>
