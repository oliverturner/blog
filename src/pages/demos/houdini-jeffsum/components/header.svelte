<script>
	import Gallery from "./gallery.svelte";

	export let jeffs = [];

	/*
  const [gradientStart, gradientEnd] = jeffs[currentIndex].gradient;
		root.attributeStyleMap.set("--gradientStart", gradientStart);
		root.attributeStyleMap.set("--gradientEnd", gradientEnd);
		*/
</script>

<header class="app__header">
	<div class="app__header__content">
		<Gallery {jeffs} />
		<div class="header__words">
			<p class="credit">
				<span>You made this?</span>
				<a href="https://www.twitter.com/seanehalpin">He made this.</a>
			</p>
			<div class="description">
				<h1 class="description__title">Placeblum.</h1>
				<p class="description__strapline">
					A little image gallery of Jeff Goldblum awesomeness.
				</p>
			</div>
		</div>
	</div>
</header>

<style lang="scss">
	.app__header {
		transition: --gradientStart 3s, --gradientEnd 3s;

		background-image: linear-gradient(
			242deg,
			var(--gradientStart) 16%,
			var(--gradientEnd) 67%
		);
	}

	.app__header__content {
		display: grid;

		position: relative;
		overflow: hidden;
		max-width: var(--maxWidth);
		margin: auto;

		@media (--mq-l) {
			overflow: visible;
		}
	}

	.header__words {
		position: relative;
		padding: 15px;
		text-align: right;
		color: #fff;
		z-index: 1;

		@media (--mq-m) {
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

		@media (--mq-m) {
			margin: 80px 0 90px;
		}
	}

	.description__title {
		margin: 0;
		font-size: 70px;
		font-weight: 600;
		letter-spacing: -2px;

		@media (--mq-l) {
			font-size: 150px;
		}
	}

	.description__strapline {
		margin: 7px 0 0 auto;
		font-size: 24px;
		font-weight: 500;

		@media (--mq-s) {
			width: 60%;
		}

		@media (--mq-m) {
			width: 40%;
			font-size: 28px;
		}

		@media (--mq-l) {
			width: 50%;
			font-size: 39px;
			text-align: left;
			opacity: 0.7;
		}
	}
</style>
