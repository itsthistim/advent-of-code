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

	let games = [];

	lines.forEach((line) => {
		let sets = line.split(': ');
		sets = sets[1].split('; ');

		let parsedSets = [];

		sets.forEach((set) => {
			let red;
			let green;
			let blue;

			let items = set.split(', ');

			items.forEach((item) => {
				let cubeCount = item.split(' ')[0];
				if (item.includes('red')) {
					red = cubeCount;
				} else if (item.includes('green')) {
					green = cubeCount;
				} else if (item.includes('blue')) {
					blue = cubeCount;
				}
			});

			parsedSets.push([red, green, blue]);
		});

		games.push(parsedSets);
	});

	const maxRedCubes = 12;
	const maxGreenCubes = 13;
	const maxBlueCubes = 14;

	for (let i = 0; i < games.length; i++) {
		let possible = true;

		for (let j = 0; j < games[i].length; j++) {
			const set = games[i][j];

			for (let k = 0; k < set.length; k++) {
				const coloredCube = set[k];

				switch (k) {
					case 0: // red
						if (coloredCube && parseInt(coloredCube) > maxRedCubes) {
							possible = false;
						}
						break;
					case 1: // green
						if (coloredCube && parseInt(coloredCube) > maxGreenCubes) {
							possible = false;
						}
						break;
					case 2: // blue
						if (coloredCube && parseInt(coloredCube) > maxBlueCubes) {
							possible = false;
						}
						break;
				}
			}
		}
		if (possible) {
			result += i + 1;
		}
	}

	return result;
}

function part2(input) {
	let lines = input.split('\r\n');
	let result = 0;

	let games = [];
	lines.forEach((line) => {
		let cubesReg = /(\d+ blue|\d+ red|\d+ green)/g;
		let cubes = line.match(cubesReg);

		games.push(cubes);
	});

	games.forEach((game) => {
		let maxRed = 0;
		let maxGreen = 0;
		let maxBlue = 0;

		game.forEach((cube) => {
			if (cube.includes('red')) {
				let count = parseInt(cube.split(' ')[0]);
				if (count > maxRed) {
					maxRed = count;
				}
			} else if (cube.includes('green')) {
				let count = parseInt(cube.split(' ')[0]);
				if (count > maxGreen) {
					maxGreen = count;
				}
			} else if (cube.includes('blue')) {
				let count = parseInt(cube.split(' ')[0]);
				if (count > maxBlue) {
					maxBlue = count;
				}
			}
		});

		result += maxRed * maxGreen * maxBlue;
	});

	return result;
}