<script lang="ts">
	import { onMount } from "svelte";
	import type { Slide } from "typings/site";

	export let duration = 3000;
	export let slides: Slide[] = [];
	export let onUpdate: (index: number) => void;

	let _imgs: HTMLImageElement[] = [];

	const slideAnimationProps = [
		{ opacity: 0, transform: "scale(1.2, 1.2)" },
		{ opacity: 1, transform: "scale(1, 1)" },
	];
	const slideAnimationConfig = {
		duration,
		fill: "both" as FillMode,
		easing: "ease-in-out",
	};

	function switchSlide(currentImg: HTMLImageElement, nextIndex: number) {
		for (const img of _imgs) {
			img.style.setProperty("z-index", "0");
		}

		currentImg.style.setProperty("z-index", "1");
		showSlide(nextIndex);
	}

	function showSlide(currentIndex = 0) {
		onUpdate(currentIndex);

		const img = _imgs[currentIndex];
		img.style.setProperty("z-index", "2");
		img.animate(slideAnimationProps, slideAnimationConfig).onfinish = () => {
			const nextIndex = currentIndex + 1;
			setTimeout(switchSlide, duration, img, nextIndex % slides.length);
		};
	}

	onMount(showSlide);
</script>

<figure class="slides">
	{#each slides as slide, index}
		<img bind:this={_imgs[index]} src={slide.src} alt={slide.alt} />
	{/each}
</figure>

<style lang="scss">
	.slides {
		position: absolute;
		overflow: hidden;
		width: 100%;
		height: 100%;
		aspect-ratio: 622 / 496;
		margin: 0;
		opacity: 0.3;
		isolation: isolate;
		background: var(--gradient-start);
		& > img {
			will-change: opacity, transform;

			position: absolute;
			top: 0;
			left: 0;

			display: block;
			width: 100%;
			object-fit: cover;
			opacity: 0;

			// Initial value: overridden by subsequent animations
			&:first-child {
				opacity: 1;
				z-index: 2;
			}
		}
		@media (--mq-medium) {
			width: 50%;
		}

		@media (--mq-large) {
			opacity: 1;
		}

		@media (--mq-xlarge) {
			top: 30px;
			left: -30px;
			width: 496px;
			height: 622px;

			box-shadow: 0 48px 64px -24px rgba(0, 0, 0, 0.3);
		}
	}
</style>
