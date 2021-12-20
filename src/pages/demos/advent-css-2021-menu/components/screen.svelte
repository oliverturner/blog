<script>
	export let title;
</script>

<div class="screen">
	<h1 class="screen__title">{title}</h1>
	<div class="screen__content">
		<slot />
	</div>
</div>

<style lang="scss">
	.screen {
		--w: 375px;
		--h: 812px;
		--text-1: #000;
		--text-2: #000;

		display: grid;
		grid-template-rows: auto 1fr;
		gap: 1rem;

		width: var(--w);
		height: var(--h);
		overflow: hidden;
		padding: 3rem 0 0;
		border-radius: var(--radius-4);
		box-shadow: var(--shadow-2);
		background-color: #fff;
	}

	.screen__title {
		margin: 0 2rem;
	}

	.screen__content {
		overflow: hidden auto;

		&::-webkit-scrollbar {
			display: none; /* for Chrome, Safari, and Opera */
		}
	}
</style>
