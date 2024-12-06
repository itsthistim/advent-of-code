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

function part2(input) {
	return 0;
}