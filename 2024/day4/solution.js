import {readInputs, run} from '../../lib/utils.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, 'input1.txt', 'input2.txt');

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	const matrix = input.split('\r\n').map(row => row.split(''));
	const solutionReg = /XMAS/g;


	let horizontals = 0;
	let verticals = 0;
	let diagonals = 0;

	// check horizontally
	for (let i = 0; i < matrix.length; i++) {
		let row = matrix[i].join('');
		horizontals += row.match(solutionReg)?.length || 0;

		row = matrix[i].reverse().join('');
		horizontals += row.match(solutionReg)?.length || 0;
	}

	// check vertically
	for (let i = 0; i < matrix.length; i++) {
		let column = matrix.map(row => row[i]).join('');
		verticals += column.match(solutionReg)?.length || 0;

		column = matrix.map(row => row[i]).reverse().join('');
		verticals += column.match(solutionReg)?.length || 0;
	}

	// check diagonally
	for (let i = 0; i < matrix.length; i++) {
		let diagonal = matrix.map((row, index) => row[index + i]).join('');
		diagonals += diagonal.match(solutionReg)?.length || 0;

		diagonal = matrix.map((row, index) => row[index + i]).reverse().join('');
		diagonals += diagonal.match(solutionReg)?.length || 0;

		diagonal = matrix.map((row, index) => row[index - i]).join('');
		diagonals += diagonal.match(solutionReg)?.length || 0;

		diagonal = matrix.map((row, index) => row[index - i]).reverse().join('');
		diagonals += diagonal.match(solutionReg)?.length || 0;
	}

	return `${horizontals} horizontals + ${verticals} verticals + ${diagonals} diagonals = ${horizontals + verticals + diagonals}`;

}

function part2(input) {
	return 0;
}