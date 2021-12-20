<script lang="ts">
	import { formatPrice } from "../utils";

	export let addItem: (id: string) => void;
	export let removeItem: (id: string) => void;
	export let id: string;
	export let img: { src?: string; alt?: string } = {};
	export let desc: string;
	export let price: number;
	export let quantity: number;

	const wh = 64;
	const itemPrice = formatPrice(price);
	const itemsPrice = formatPrice(quantity * price);
</script>

<div class="item">
	<figure class="item__thumb">
		<img
			class="thumb__img"
			src={img.src}
			alt={img.alt}
			width={wh}
			height={wh}
		/>
		<figcaption class="thumb__label">{quantity}</figcaption>
	</figure>
	<p class="item__details">
		<span>{desc}</span>
		<span>{itemPrice}</span>
	</p>
	<div class="item__quantity">
		<div class="quantity__buttons">
			<button on:click={() => removeItem(id)}>-</button>
			<span>{quantity}</span>
			<button on:click={() => addItem(id)}>+</button>
		</div>
		<p class="quantity__price">{itemsPrice}</p>
	</div>
</div>

<style lang="scss">
	.item {
		--wh: 64px;

		display: grid;
		grid-template-columns: var(--wh) 1fr;
		grid-template-rows: var(--wh) 1fr;
		grid-template-areas:
			"thumb details"
			".     quantity";
		align-items: center;
		gap: 0 1rem;

		& p {
			margin: 0;
		}
	}

	.item__thumb {
		grid-area: thumb;

		display: grid;
		place-content: center;

		width: var(--wh);
		aspect-ratio: 1;
		margin: 0;
		padding: 0;
		border-radius: var(--radius-round);
	}

	.thumb__img,
	.thumb__label {
		grid-area: 1/1/-1/-1;

		width: var(--wh);
		aspect-ratio: 1;
	}

	.thumb__label {
		--wh: 32px;
		margin: auto;
		border-radius: var(--radius-round);
		line-height: var(--wh);
		text-align: center;
		background: #000;
		color: #fff;
	}

	.item__details {
		grid-area: details;
	}

	.item__quantity {
		--wh: 32px;

		grid-area: quantity;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;

		line-height: var(--wh);
	}

	.quantity__buttons {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		& button {
			--radius: var(--radius-round);

			all: unset;
			width: var(--wh);
			height: var(--wh);
			border-radius: var(--radius);
			background: var(--colour-primary);
			color: #fff;

			text-align: center;
			cursor: pointer;
		}
	}
</style>
