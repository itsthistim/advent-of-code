require('dotenv').config();
const { hrtime } = require('process');

const loadInput = require('aoc-loader');
const { yellow, black } = require('colorette');

async function main() {
	let actual = await loadInput(2023, 1);

	let test = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

	let test_part2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

	let startTime = hrtime();
	const part1 = await solvePart1(actual);
	let endTime = hrtime(startTime);

	console.info(yellow(part1), black('\t(Part 1)'), black(`(${(endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)}ms)`));

	startTime = hrtime();
	const part2 = await solvePart2(actual);
	endTime = hrtime(startTime);

	console.info(yellow(part2), black('\t(Part 2)'), black(`(${(endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)}ms)`));
}

async function solvePart1(input) {
	let lines = input.split('\n');
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

async function solvePart2(input) {
	let lines = input.split('\n');
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

main();
