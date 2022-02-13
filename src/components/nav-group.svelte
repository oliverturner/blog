<script lang="ts">
	import type { Link, LinkGroup } from "typings/site";

	export let currentPath: string = "";
	export let links: (Link | LinkGroup)[] = [];
	export let depth = 1;

	function isLinkGroup(link: Link | LinkGroup): link is LinkGroup {
		return "links" in link;
	}

	function isActive(permalink: string): boolean {
		return permalink === currentPath;
	}
</script>

<ul class="links">
	{#each links as link}
		{#if !link.hidden}
			{#if isLinkGroup(link)}
				<li class="item item--group">
					<a class="title title--{depth} link" href={link.permalink}>
						{link.title}
					</a>
					<svelte:self {...link} {currentPath} depth={depth + 1} />
				</li>
			{:else}
				<li class="item" class:item--active={isActive(link.permalink)}>
					<a class="link" href={link.permalink}>{link.title}</a>
				</li>
			{/if}
		{/if}
	{/each}
</ul>

<style lang="scss">
	.links {
		margin: 0;
		padding: 0;

		& .links {
			padding: 0 0 0 1rem;
		}
	}

	.link {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.item {
		list-style: initial;

		&.item--group {
			margin-top: 1rem;
			list-style: none;
		}

		&.item--active {
			color: var(--brand);
		}
	}

	.title--1 {
		color: white;
	}
</style>
