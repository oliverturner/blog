<script lang="ts">
	import type { MenuItem as TMenuItem } from "../store";
	import { basket } from "../store";
	import Screen from "./screen.svelte";
	import MenuItem from "./menu-item.svelte";

	export let items: Record<string, TMenuItem> = {};

	function updateBasket(id: string) {
		if ($basket[id]) {
			return basket.update((items) => {
				delete items[id];
				return items;
			});
		}

		basket.update((items) => {
			items[id] = 1;
			return items;
		});
	}
</script>

<Screen title="To Go Menu">
	<ul class="items">
		{#each Object.entries(items) as [id, item]}
			<li class="item">
				<MenuItem {id} {...item} {updateBasket} isAdded={Boolean($basket[id])}>
					{Boolean($basket[id]) ? "Remove all" : "Add to basket"}
				</MenuItem>
			</li>
		{/each}
	</ul>
</Screen>

<style lang="scss">
	.items {
		display: grid;
		gap: var(--img-y);

		margin: 0;
		padding: var(--img-y) 0 0 1rem;
		list-style: none;
	}

	.item {
		position: relative;

		&:nth-child(3n + 1) {
			--bg: var(--colour-pattens);
		}

		&:nth-child(3n + 2) {
			--bg: var(--colour-dusk);
		}

		&:nth-child(3n + 3) {
			--bg: var(--colour-ice);
		}

		&::before {
			content: "";
			position: absolute;
			display: block;
			width: calc(100% - 1rem);
			height: calc(100% - var(--img-y));
			top: 0;
			right: 0;
			border-top-left-radius: var(--radius-3);
			border-bottom-left-radius: var(--radius-3);
			background: var(--bg);
		}
	}
</style>
