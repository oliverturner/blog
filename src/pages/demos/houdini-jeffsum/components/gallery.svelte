<script lang="ts">
	import { onMount } from "svelte";

	export let jeffs = [];

	let slides: HTMLImageElement[] = [];
	let currentIndex = 0;

	const config = {
		duration: 3000,
		fill: "both" as FillMode,
		easing: "ease-in-out",
	};

	const switchJeff = (currentSlide: HTMLImageElement, nextIndex: number) => {
		for (const slide of slides) {
			slide.style.setProperty("z-index", "0");
		}

		currentSlide.style.setProperty("z-index", "1");
		showJeff(nextIndex);
	};

	export const showJeff = (currentIndex = 0) => {
		const slide = slides[currentIndex];

		slide.style.setProperty("z-index", "2");
		slide.animate(
			[
				{ opacity: 0, transform: "scale(1.2, 1.2)" },
				{ opacity: 1, transform: "scale(1, 1)" },
			],
			config
		).onfinish = () => {
			const nextIndex = currentIndex + 1;
			setTimeout(switchJeff, config.duration, slide, nextIndex % jeffs.length);
		};
	};

	onMount(showJeff);
</script>

<figure class="header__jeffs">
	{#each jeffs as jeff, index}
		<img bind:this={slides[index]} src={jeff.src} alt={jeff.alt} />
	{/each}
</figure>

<style lang="scss">
	.header__jeffs {
		position: absolute;
		max-width: 100%;
		width: 496px;
		height: 622px;
		opacity: 0.3;
		overflow: hidden;
		z-index: 1;

		& > img {
			will-change: opacity, transform;

			position: absolute;
			top: 0;
			left: 0;

			display: block;
			width: 100%;
			opacity: 0;
			background: var(--gradientEnd);

			&:first-child {
				opacity: 1;
				z-index: 2;
			}
		}

		@media (--mq-l) {
			top: 30px;
			opacity: 1;
			box-shadow: 0 48px 64px -24px rgba(0, 0, 0, 0.3);
		}
	}
</style>
