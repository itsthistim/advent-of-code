require('dotenv').config();
const { hrtime } = require('process');

const loadInput = require('aoc-loader');
const { yellow, black, green, blue } = require('colorette');

async function main() {
	let actual = await loadInput(2023, 2);

	let test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

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

async function solvePart2(input) {
	let lines = input.split('\n');
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

main();
