<script lang="ts">
	import type { Link, LinkGroup } from "typings/site";
	import NavLink from "./nav-link.svelte";

	export let currentPath: string = "";
	export let links: (Link | LinkGroup)[] = [];
	export let depth = 1;

	function isLinkGroup(link: Link | LinkGroup): link is LinkGroup {
		return (link as LinkGroup).links !== undefined;
	}

	function isActive(permalink: string): boolean {
		console.log(permalink, currentPath, permalink === currentPath);

		return permalink === currentPath;
	}
</script>

<ul class="links">
	{#each links as link}
		{#if isLinkGroup(link)}
			<li class="item item--group">
				<span class="title title--{depth}">
					{link.title}
				</span>
				<svelte:self {...link} {currentPath} depth={depth + 1} />
			</li>
		{:else}
			<li class="item" class:item--active={isActive(link.permalink)}>
				<NavLink {...link} />
			</li>
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

	.item {
		list-style: initial;

		&.item--group {
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
