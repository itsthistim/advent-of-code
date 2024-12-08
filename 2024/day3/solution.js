import {readInputs, run} from '../../lib/utils.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, 'input1.txt', 'input2.txt');

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	return 0;
}

function part2(input) {
	return 0;
}