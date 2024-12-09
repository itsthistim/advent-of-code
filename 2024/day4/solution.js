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

	let occurences = 0;

	// check horizontally
	for (let i = 0; i < matrix.length; i++) {
		let row = matrix[i].join('');
		occurences += row.match(solutionReg)?.length || 0;
		occurences += row.split('').reverse().join('').match(solutionReg)?.length || 0;
	}

	// check vertically
	for (let i = 0; i < matrix.length; i++) {
		let column = matrix.map(row => row[i]).join('');
		occurences += column.match(solutionReg)?.length || 0;
		occurences += column.split('').reverse().join('').match(solutionReg)?.length || 0;
	}

	// check diagonally
	// upper left to lower right
	for (let i = 0; i < matrix.length; i++) {
		let diagonal = '';
		for (let j = 0; j < matrix.length - i; j++) {
			diagonal += matrix[j][i + j];
		}
		occurences += diagonal.match(solutionReg)?.length || 0;
		occurences += diagonal.split('').reverse().join('').match(solutionReg)?.length || 0;
	}

	// lower left to upper right
	for (let i = 1; i < matrix.length; i++) {
		let diagonal = '';
		for (let j = 0; j < matrix.length - i; j++) {
			diagonal += matrix[i + j][j];
		}
		occurences += diagonal.match(solutionReg)?.length || 0;
		occurences += diagonal.split('').reverse().join('').match(solutionReg)?.length || 0;
	}

	// lower right to upper left
	for (let i = 0; i < matrix.length; i++) {
		let diagonal = '';
		for (let j = 0; j <= i; j++) {
			diagonal += matrix[j][i - j];
		}
		occurences += diagonal.match(solutionReg)?.length || 0;
		occurences += diagonal.split('').reverse().join('').match(solutionReg)?.length || 0;
	}

	// upper right to lower left
	for (let i = 1; i < matrix.length; i++) {
		let diagonal = '';
		for (let j = 0; j < matrix.length - i; j++) {
			diagonal += matrix[j + i][matrix.length - j - 1];
		}
		occurences += diagonal.match(solutionReg)?.length || 0;
		occurences += diagonal.split('').reverse().join('').match(solutionReg)?.length || 0;
	}

	return occurences;
}

function part2(input) {
	return 0;
}