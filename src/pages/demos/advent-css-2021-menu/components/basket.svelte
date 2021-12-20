<script lang="ts">
	import type { MenuItem as TMenuItem } from "../store";
	import { basket } from "../store";
	import { formatPrice } from "../utils";
	import Screen from "./screen.svelte";
	import BasketItem from "./basket-item.svelte";

	export let items: Record<string, TMenuItem> = {};

	function addItem(id: string) {
		basket.update((items) => {
			items[id] += 1;
			return items;
		});
	}

	function removeItem(id: string) {
		basket.update((items) => {
			if (items[id] > 0) {
				items[id] -= 1;
			}
			if (items[id] === 0) {
				delete items[id];
			}

			return items;
		});
	}

	$: itemNum = Object.keys($basket).length;
	$: subTotal = Object.entries($basket).reduce((acc, [id, quantity]) => {
		const { price } = items[id];
		return acc + price * quantity;
	}, 0);
	$: total = subTotal * 1.25;
	$: tax = total - subTotal;
</script>

<Screen title="Your basket">
	<div class="basket">
		{#if itemNum === 0}
			<p class="items">Your basket is empty</p>
		{:else}
			<ul class="items">
				{#each Object.entries($basket) as [id, quantity] (id)}
					<li class="item">
						<BasketItem {id} {...items[id]} {quantity} {addItem} {removeItem} />
					</li>
				{/each}
			</ul>
		{/if}
		<dl class="totals">
			<dt>Subtotal</dt>
			<dd>{formatPrice(subTotal)}</dd>
			<dt>Tax</dt>
			<dd>{formatPrice(tax)}</dd>
			<dt>Total</dt>
			<dd>{formatPrice(total)}</dd>
		</dl>
	</div>
</Screen>

<style lang="scss">
	.basket {
		display: grid;
		grid-template-rows: 1fr auto;

		max-height: 100%;
	}

	.items {
		overflow: hidden auto;

		list-style: none;
		margin: 0;
		padding: 0 2rem;
	}

	.item {
		padding: 1rem 0;
	}

	.item + .item {
		border-top: 1px solid var(--gray-4);
	}

	.totals {
		display: grid;
		grid-template-columns: 1fr min-content;
		justify-content: end;
		gap: 1rem;

		margin: 0;
		padding: 2rem;

		& dt {
			text-align: end;

			&::after {
				content: ":";
			}
		}

		& dd {
			margin: 0;
			text-align: end;
		}
	}
</style>
