import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {run} from '../../lib/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input1 = fs.readFileSync(`${__dirname}/input1.txt`, 'utf8');
const input2 = fs.readFileSync(`${__dirname}/input2.txt`, 'utf8');

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	let lines = input.split('\r\n');
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

function part2(input) {
	return 0;
}