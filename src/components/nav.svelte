<script lang="ts">
	import type { Link, LinkGroup } from "typings/site";
	import NavGroup from "$components/nav-group.svelte";

	export let links: (Link | LinkGroup)[] = [];
</script>

<nav class="nav">
	<NavGroup {links} />
</nav>

<style lang="scss">
	.nav {
		display: grid;
		align-content: start;

		position: relative;
		padding: 1rem;
		background-color: var(--surface2);
		color: var(--text2);
	}
</style>
