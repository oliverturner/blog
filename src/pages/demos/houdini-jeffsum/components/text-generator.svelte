<form class="jeffness">
	<label class="jeffness__label">
		Inject Jeff's work into my veins like
		<input class="jeffness__input" type="number" name="paragraphs" value="15" />
		<span>times</span>
	</label>
	<button class="jeffness__btn">Receive the Jeff.</button>
</form>

<style lang="scss">
	/* The Jeffness ----------------------*/
	.jeffness {
		display: flex;
		flex-direction: column;

		position: relative;
		transform: translate3D(0, -50%, 0);
		margin: 0 15px;
		font-size: 20px;
		text-align: center;
		box-shadow: 0 23px 50px -13px rgba(0, 0, 0, 0.3);
		background: #fff;
		color: initial;
		z-index: 1;

		@media (--mq-large) {
			flex-direction: row;
			align-items: center;

			position: absolute;
			right: 0;
		}
	}

	.jeffness__label,
	.jeffness__btn {
		flex: 1 0 100%;

		line-height: 36px;
	}

	.jeffness__label {
		padding: 0.5em 1em;

		& > span {
			display: inline-block;
		}

		@media (--mq-medium) {
			& > span {
				display: inline;
			}
		}

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
