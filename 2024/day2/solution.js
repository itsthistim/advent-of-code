import {readInputs, run} from '../../lib/utils.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, 'input1.txt', 'input2.txt');

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	const reports = input.split('\n').map(report => report.split(' ').map(Number));

	let unsafeReports = [];

	for (let i = 0; i < reports.length; i++) {
		let report = reports[i];

		// for a report to be safe, all containing numbers must either be increasing or decreasing
		let increasing = false;
		let decreasing = false;

		for (let j = 0; j < report.length; j++) {
			if (report[j] < report[j + 1]) {
				increasing = true;
			} else if (report[j] > report[j + 1]) {
				decreasing = true;
			} else if (report[j] === report[j + 1]) {
				increasing = true;
				decreasing = true;
			}
		}

		if ((increasing && decreasing) || (!increasing && !decreasing)) {
			unsafeReports.push(report);
		}

		// check if any two adjacent numbers differ by at least 1 and at most 3
		for (let k = 0; k < report.length; k++) {
			if (Math.abs(report[k] - report[k + 1]) < 1 || Math.abs(report[k] - report[k + 1]) > 3) {
				unsafeReports.push(report);
			}
		}
	}

	return reports.filter(report => !unsafeReports.includes(report)).length;
}

function part2(input) {
	return 0;
}