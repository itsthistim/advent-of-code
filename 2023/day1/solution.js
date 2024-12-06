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
	let lines = input.split("\r\n");
	let result = 0;

	lines.forEach((line) => {
		let numbers = line.match(/\d/g);

		if (numbers.length > 0) {
			let first = numbers[0];
			let last = numbers[numbers.length - 1];

			let combined = parseInt(`${first}${last}`);

			result += combined;
		}
	});

	return result;
}

function part2(input) {
	let lines = input.split("\r\n");
	let result = 0;

	const wordNumbers = {
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9
	};

	lines.forEach((line) => {
		let frontReg = /^.*?(\d|one|two|three|four|five|six|seven|eight|nine)/;
		let backReg = /^.*(\d|one|two|three|four|five|six|seven|eight|nine).*$/;

		let first = line.match(frontReg)[1];
		let last = line.match(backReg)[1];

		let firstNumber = parseInt(first) || wordNumbers[first];
		let lastNumber = parseInt(last) || wordNumbers[last];

		let combined = parseInt(`${firstNumber}${lastNumber}`);

		result += combined;
	});

	return result;
}