import {readInputs, run} from '../../lib/utils.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, 'input1.txt', 'input2.txt');

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	function mul(a, b) {
		return a * b;
	}

	const instructionRegex = /mul\(\d+,\d+\)/g;
	const instructions = input.match(instructionRegex);

	let result = 0;
	instructions.forEach(instruction => {
		const [a, b] = instruction.match(/\d+/g).map(Number);
		result += mul(a, b);
	});

	return result;
}

function part2(input) {
	return 0;
}