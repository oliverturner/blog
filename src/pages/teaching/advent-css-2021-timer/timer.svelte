<script>
	const maxTime = 10;
	let timerRunning = false;
	let timerInterval;

	let dial = "red";
	let deg = 0;
	let startBtnLabel = "start";
	let timeElapsed = 0;

	function convertSeconds(value) {
		const mins = Math.floor(value / 60);
		const secs = value % 60 ? value % 60 : "00";
		return `${mins}`.padStart(2, "0") + ":" + `${secs}`.padStart(2, "0");
	}

	function updateTimer() {
		if (++timeElapsed === maxTime) {
			clearTimeout(timerInterval);
		}
	}

	function resetTimer() {
		clearTimeout(timerInterval);
		timerRunning = false;
		timeElapsed = 0;

		startBtnLabel = "start";
	}

	function onStartBtnClick() {
		if (timeElapsed >= maxTime) {
			return resetTimer();
		}

		timerRunning = !timerRunning;

		if (timerRunning) {
			timerInterval = setInterval(updateTimer, 1000);
		} else {
			clearTimeout(timerInterval);
		}
	}

	$: deg = Math.round((timeElapsed / maxTime) * 360) + "deg";
	$: isComplete = timeElapsed >= maxTime;
	$: dial = isComplete ? "green" : "red";
	$: timeElapsedLabel = convertSeconds(maxTime - timeElapsed);
	$: startBtnLabel = isComplete ? "reset" : timerRunning ? "stop" : "start";
</script>

<div class="app">
	<div class="timer">
		<div class="timer__dial" style="--dial:{dial};--deg:{deg}" />
		<div class="timer__controls">
			<p class="timer__elapsed">{timeElapsedLabel}</p>
			<button class="timer__btn" on:click={onStartBtnClick}>
				{startBtnLabel}
			</button>
			<button class="timer__prefs">
				<img src="https://assets.codepen.io/3232/gear.svg" />
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	@font-face {
		font-family: "Bebas Neue";
		src: url("/fonts/bebasneue-book-webfont.woff2") format("woff2"),
			url("/fonts/bebasneue-book-webfont.woff") format("woff");
	}

	button {
		all: unset;
		cursor: pointer;

		&:focus,
		&:active {
			// TODO: fix styling
			// outline: 1px solid currentColor;
		}
	}

	:root {
		--app-bg: #2b2a30;
	}

	.app {
		display: grid;
		place-content: center;
		height: 100%;
	}

	.timer {
		--deg: 0;
		--dial: red;
		--wh: 20rem;
		--wh-inner: 19.5rem;

		display: grid;

		line-height: 1;
		font-family: "Montserrat", sans-serif;
		text-align: center;
		color: white;
	}

	.timer__dial,
	.timer__controls {
		grid-area: 1/1/-1/-1;

		position: relative;
		width: var(--wh);
		aspect-ratio: 1;
		border-radius: var(--wh);
		background: var(--bg);
	}

	.timer__dial {
		--bg: conic-gradient(var(--dial) 0, var(--deg), black var(--deg));

		transform: rotate(180deg);
		filter: drop-shadow(0 0 0.75rem black);
	}

	.timer__controls {
		--wh: var(--wh-inner);
		--bg: var(--app-bg);

		display: grid;
		place-content: center;

		margin: auto;
	}

	.timer__elapsed {
		margin: 0;
		font-size: 6rem;
		font-family: "Bebas Neue", sans-serif;
		text-align: center;
	}

	.timer__btn {
		padding: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 3px;
		font-size: 0.8rem;
		font-weight: 800;
	}

	.timer__prefs {
		width: 20px;
		aspect-ratio: 1;
		margin: auto;
		padding: 0.5rem;
	}

	.timer__prefs > img {
		width: 100%;
		max-width: 100%;
	}
</style>
