<script lang="ts">
	export let onSubmit: ({ paras }: { paras: number }) => Promise<void>;

	let _form: HTMLFormElement;
	const id = "jeffsum-paras";

	function _onSubmit() {
		const data = new FormData(_form);
		const paras = parseInt(data.get("paras") as string, 10);
		onSubmit({ paras });
	}
</script>

<form class="jeffness" on:submit|preventDefault={_onSubmit} bind:this={_form}>
	<label class="jeffness__label" for={id}>
		Give me like
		<input class="jeffness__input" {id} type="number" name="paras" value="5" />
		<span>paragraphs of that Jeffness.</span>
	</label>
	<button class="jeffness__btn">Receive the Jeff.</button>
</form>

<style lang="scss">
	input,
	button {
		all: unset;
		cursor: pointer;
	}
	.jeffness {
		display: flex;
		flex-direction: column;

		position: relative;
		transform: translate(0, -50%);
		margin: 0 auto;
		font-size: 20px;
		text-align: center;
		box-shadow: var(--shadow-5);
		background: #fff;
		color: var(--text1);
		z-index: 1;

		@media (--mq-large) {
			flex-direction: row;
			align-items: center;

			margin: 0 0 0 auto;
		}
	}

	.jeffness__label,
	.jeffness__btn {
		line-height: 36px;
	}

	.jeffness__label {
		padding: 0.5em 1em;
		@media (--mq-large) {
			flex: 0 0 auto;
			padding: 0 2em;
		}
	}

	.jeffness__input {
		transition: --gradient-end 3s;

		width: 2em;
		border: 1px solid var(--gradient-end);
		border-radius: 3px;
		text-align: center;
	}

	.jeffness__btn {
		transition: --gradient-end 3s;

		/* Add 2px to account for border on input */
		padding: calc(0.5em + 2px);
		background: var(--gradient-end);
		color: #fff;

		@media (--mq-large) {
			flex: 0 0 auto;
			padding: 1em 2em;
		}
	}
</style>
