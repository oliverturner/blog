<header class="header">
	<div class="header__content">
		<slot />
		<div class="header__words">
			<p class="credit">
				<span>You made this?</span>
				<a href="https://www.twitter.com/seanehalpin">He made this.</a>
			</p>
			<div class="description">
				<h1 class="description__title">Jeffsum.</h1>
				<p class="description__strapline">
					A little image gallery of Jeff Goldblum awesomeness.
				</p>
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	.header {
		width: 100%;
		transition: --gradient-start 3s, --gradient-end 3s;

		background-image: linear-gradient(
			242deg,
			var(--gradient-start) 16%,
			var(--gradient-end) 67%
		);
	}

	.header__content {
		display: grid;

		position: relative;
		overflow: hidden;
		max-width: var(--max-width);
		margin: auto;

		@media (--mq-large) {
			overflow: visible;
		}
	}

	.header__words {
		position: relative;
		padding: 15px;
		text-align: right;
		color: #fff;
		z-index: 1;

		@media (--mq-medium) {
			background: none;
		}
	}

	.credit {
		margin: 0;

		& span,
		& a {
			opacity: 0.75;
		}

		& a {
			font-weight: 500;
			text-decoration: line-through;

			&:hover {
				opacity: 1;
				text-decoration: none;
			}
		}
	}

	.description {
		margin: 50px 30px 90px;

		@media (--mq-medium) {
			margin: 80px 0 90px;
		}
	}

	.description__title {
		margin: 0;
		font-family: inherit;
		font-size: 70px;
		font-weight: 600;
		line-height: 1;
		letter-spacing: -2px;

		@media (--mq-large) {
			font-size: 212px;
		}
	}

	.description__strapline {
		--font-size: 24px;
		--width: 100%;

		width: var(--width);
		margin: 7px 0 0 auto;
		font-size: var(--font-size);
		font-weight: 500;

		@media (--mq-small) {
			--width: 60%;
		}

		@media (--mq-medium) {
			--width: 40%;
			--font-size: 28px;
		}

		@media (--mq-large) {
			--width: 50%;
			--font-size: 39px;

			text-align: left;
			opacity: 0.7;
		}
	}
</style>
