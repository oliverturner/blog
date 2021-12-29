<script lang="ts">
	import type { Link, LinkGroup } from "typings/site";

	import NavLink from "./nav-link.svelte";

	export let links: (Link | LinkGroup)[] = [];
	export let depth = 1;
</script>

<ul class="links">
	{#each links as link}
		<li>
			{#if link.links}
				<span class="title title--{depth}">
					{link.title}
				</span>
				<svelte:self {...link} depth={depth + 1} />
			{:else}
				<NavLink {...link} />
			{/if}
		</li>
	{/each}
</ul>

<style lang="scss">
	.title {
		--font-size: 1.5rem;
		--mt: 1.5rem;
		--mb: 0.5rem;

		display: block;
		font-size: var(--font-size);
		margin: var(--mt) 0 var(--mb);

		&.title--2 {
			--font-size: 1.25rem;
			--mt: 0.5rem;
			--mb: 0.25rem;
		}

		&.title--3 {
			--font-size: 1rem;
			--mt: 1rem;
			--mb: 0;
		}
	}

	.links .links {
		margin: 0;
		padding: 0 0 0 1rem;
	}
</style>
