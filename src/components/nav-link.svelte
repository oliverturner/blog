<script lang="ts">
	export let title: string;
	export let permalink: string;
</script>

<a class="link" href={permalink}>{title}</a>

<style>
	.link {
		text-decoration: none;
	}
</style>
