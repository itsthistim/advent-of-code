import {readInputs, run} from "../../lib/utils.js";
import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, "input1.txt", "input2.txt");

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	let [orderingRules, updates] = input.trim().split('\r\n\r\n').map(x => x.split('\r\n'));

	orderingRules = orderingRules.map(x => x.split('|').map(Number));
	updates = updates.map(x => x.split(',').map(Number));

	let correctUpdates = [];

	for (let i = 0; i < updates.length; i++) {
		const update = updates[i];
		let correctOrder = true;

		for (let j = 0; j < update.length; j++) {
			const page = update[j];

			// get ordering rules for the page
			const pageOrderingRules = orderingRules.filter(x => x[0] === page);

			// check for broken ordering rules
			for (let k = 0; k < pageOrderingRules.length; k++) {
				const rule = pageOrderingRules[k];
				const pageAfter = rule[1];

				// check whether pageAfter is actually somewhere after the current page. if not, the update is invalid
				const nextPageIndex = update.indexOf(pageAfter);
				if (j > nextPageIndex && nextPageIndex !== -1) {
					correctOrder = false;
					break;
				}
			}
		}

		if (correctOrder === true) {
			correctUpdates.push(update);
		}
	}

	// get middle page number
	let middlePageNumbers = 0;
	for (let i = 0; i < correctUpdates.length; i++) {
		const update = correctUpdates[i];

		if (update.length === 0) continue;
		middlePageNumbers += update[Math.floor(update.length / 2)];
	}

	return middlePageNumbers;
}

function part2(input) {
	return 0;
}
