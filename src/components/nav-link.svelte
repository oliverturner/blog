<script lang="ts">
	export let title: string;
	export let permalink: string;
</script>

<a class="link" href={permalink}>{title}</a>

<style lang="scss">
	.link {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
