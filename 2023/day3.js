require('dotenv').config();
const { hrtime } = require('process');

const loadInput = require('aoc-loader');
const { yellow, black } = require('colorette');

async function main() {
	let actual = await loadInput(2023, 3);

	let test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

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
	let result = 0;

	let lines = input.split('\n');
	let grid = [];

	lines.forEach((line) => {
		grid.push(line.split(''));
	});

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			let char = grid[y][x];

			if (char.match(/\d/)) {
				// get whole number
				let tmpX = x;
				let number = '';
				while (grid[y][x] && grid[y][x].match(/\d/)) {
					number += grid[y][x];
					x++;
				}

				let adjacent = false;

				// check if any digit is adjacent to a symbol
				let digits = number.split('');
				digits.forEach((digit, pos) => {
					x = tmpX + pos;
					const offsets = [-1, 0, 1];

					for (let i of offsets) {
						for (let j of offsets) {
							if (i === 0 && j === 0) continue; // don't check the digit itself
							if (grid[y + i] && grid[y + i][x + j] && grid[y + i][x + j].match(/[^\d.]/)) {
								adjacent = true;
								break;
							}
						}
					}
				});

				if (adjacent) {
					result += parseInt(number);
				}
			}
		}
	}

	return result;
}

async function solvePart2(input) {}

main();
