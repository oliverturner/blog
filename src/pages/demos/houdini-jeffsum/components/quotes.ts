const quotes = [
	"We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!",
	"God help us, we're in the hands of engineers.",
	"Forget the fat lady! You're obsessed with the fat lady!",
	"Hey, take a look at the earthlings. Goodbye!",
	"Checkmate...",
	"God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.",
	"You know what? It is beets. I've crashed into a beet truck.",
	"You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager?",
	"Must go faster.",
	"So you two dig up, dig up dinosaurs?",
	"Eventually, you do plan to have dinosaurs on your dinosaur tour, right?",
	"Must go faster... go, go, go, go, go!",
	"Hey, you know how I'm, like. always trying to save the planet? Here's my chance.",
	"My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard!",
	"I was part of something special.",
	"Do you have any idea how long it takes those cups to decompose.",
	"I gave it a cold? I gave it a virus. A computer virus.",
	"Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.",
	"What do they got in there? King Kong?",
	"You really think you can fly that thing?",
	"This thing comes fully loaded. AM/FM radio, reclining bucket seats, and power windows.",
	"Yes, Yes, without the oops!",
	"They're using our own satellites against us. And the clock is ticking.",
	"Just my luck, no ice.",
	"Remind me to thank John for a lovely weekend.",
	"I travel for work, but recently, friends said I should take major trips.",
	"I love to be directed. They can trust me and go.",
	"No matter how you travel, it's still you going.",
	"If any movie people are watching this show, please, for me, have some respect. You wanna sell some tickets, act like you know what you're talking about.",
	"It's mysterious what attracts you to a person.",
	"I, uh, don't think I'm, y'know, so different than your average, y'know, average.",
	"It's a delight to trust somebody so completely.",
	"It's nice to play a character that has a soulful, dependent, close relationship. It must mean my character is interesting in some way.",
];

/**
 *
 * @param arr
 * @returns
 */
function shuffle<T>(arr: T[]): T[] {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

		// swap elements array[i] and array[j]
		// we use "destructuring assignment" syntax to achieve that
		// you'll find more details about that syntax in later chapters
		// same can be written as:
		// let t = array[i]; array[i] = array[j]; array[j] = t
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

/**
 * Return n paragraphs of random quotes up to max length.
 */
export function jeffsum(n: number, max: number = 10): string[] {
	let paras = [];
	for (let i = 0; i < n; i++) {
		let shuffledQuotes = shuffle(quotes);
		let para = [];
		for (let j = 0; j < Math.ceil(Math.random() * max); j++) {
			para.push(shuffledQuotes[j]);
		}
		paras.push(para.join(" "));
	}
	return paras;
}
