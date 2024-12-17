import {readInputs, run} from "../../lib/utils.js";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, "input1.txt", "input2.txt");

run("Part 1", part1, input1);

function part1(input) {
	function findGuard(map) {
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				if (map[y][x] === '^' || map[y][x] === 'v' || map[y][x] === '<' || map[y][x] === '>') {
					return {x, y, facing: map[y][x]};
				}
			}
		}
	}

	let map = input.split("\r\n").map(row => row.split(""));

	// find initial guard position
	let guard = findGuard(map);

	// while is in the mapped area, keep walking
	while (guard.x >= 0 && guard.x < map[0].length && guard.y >= 0 && guard.y < map.length) {

		// check whether the guard bumped into a wall
		if (map[guard.y][guard.x] === '#') {
			switch (guard.facing) {
				case '^':
					guard.y++;
					guard.facing = '>';
					break;
				case '>':
					guard.x--;
					guard.facing = 'v';
					break;
				case 'v':
					guard.y--;
					guard.facing = '<';
					break;
				case '<':
					guard.x++;
					guard.facing = '^';
					break;
			}
		}

		// mark the current position
		map[guard.y][guard.x] = 'X';

		// take a step
		switch (guard.facing) {
			case '^':
				guard.y--;
				break;
			case '>':
				guard.x++;
				break;
			case 'v':
				guard.y++;
				break;
			case '<':
				guard.x--;
				break;
		}
	}

	// count the number of marked positions
	let visited = 0;
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === 'X') {
				visited++;
			}
		}
	}

	return visited;
}