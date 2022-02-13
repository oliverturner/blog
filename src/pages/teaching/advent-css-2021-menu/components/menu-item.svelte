<script lang="ts">
	import { formatPrice } from "../utils";

	export let isAdded: boolean = false;
	export let updateBasket: (id: string) => void;
	export let id: string;
	export let img: { src?: string; alt?: string } = {};
	export let desc: string;
	export let price: number;
</script>

<div class="item" class:item--added={isAdded}>
	<img class="item__img" src={img.src} alt={img.alt} />
	<p class="item__desc">{desc}</p>
	<p class="item__price">{formatPrice(price)}</p>
	<button class="item__btn" on:click={() => updateBasket(id)}>
		<slot />
	</button>
</div>

<style lang="scss">
	button {
		all: unset;
	}

	.item {
		display: grid;
		grid-template-columns: 150px 1fr;
		grid-template-areas:
			"img desc"
			"img price"
			"img btn";
		align-items: center;
		gap: 0 1rem;

		position: relative;

		& > * {
			margin: 0;
		}
	}

	.item__img {
		grid-area: img;
		width: 150px;
		aspect-ratio: 1;
		transform: translate(-0.2rem, -1.4rem);
	}

	.item__desc {
		grid-area: desc;
	}

	.item__price {
		grid-area: price;

		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
	}

	.item__btn {
		--bg: var(--colour-primary);

		grid-area: btn;

		margin-right: auto;
		padding: 0.25rem 1rem;
		border-radius: var(--radius-5);
		font-weight: 700;
		background: var(--bg);
		color: #fff;

		.item--added & {
			--bg: #000;
		}
	}
</style>
