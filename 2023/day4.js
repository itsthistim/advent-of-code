require('dotenv').config();
const { hrtime } = require('process');

const loadInput = require('aoc-loader');
const { yellow, black } = require('colorette');

async function main() {
	let actual = await loadInput(2023, 4);

	let test = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

	let startTime = hrtime();
	const part1 = await day4(actual);
	let endTime = hrtime(startTime);

	console.info(yellow(part1), black('\t(Part 1)'), black(`(${(endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)}ms)`));

	startTime = hrtime();
	const part2 = await day4_part2(actual);
	endTime = hrtime(startTime);

	console.info(yellow(part2), black('\t(Part 2)'), black(`(${(endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)}ms)`));
}

async function day4(input) {
	let lines = input.split('\n');
	let result = 0;

	let cards = [];

	for (let line of lines) {
		let [card, numbers] = line.split(': ');
		let [winningCardNumbers, ownedCardNumbers] = numbers.split(' | ');

		let winningCards = winningCardNumbers.split(' ');
		let ownedCards = ownedCardNumbers.split(' ');

		winningCards = winningCards.map((item) => parseInt(item)).filter((item) => !isNaN(item));
		ownedCards = ownedCards.map((item) => parseInt(item)).filter((item) => !isNaN(item));

		cards.push({
			winningCards,
			ownedCards
		});
	}

	for (let card of cards) {
		let hits = 0;

		for (let ownedCard of card.ownedCards) {
			if (card.winningCards.includes(ownedCard)) {
				hits++;
			}
		}

		if (hits > 0) result += Math.pow(2, hits - 1);
	}

	return result;
}

async function day4_part2(input) {}

main();
