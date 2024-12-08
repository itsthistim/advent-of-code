import {readInputs, run} from '../../lib/utils.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const {input1, input2} = readInputs(__dirname, 'input1.txt', 'input2.txt');

run("Part 1", part1, input1);
run("Part 2", part2, input2);

function part1(input) {
	function getSmallestId(arr) {
		let smallest;
		for (const id of arr) {
			if (!smallest || id < smallest) {
				smallest = id;
			}
		}
		return smallest;
	}

	function getDistance(id1, id2) {
		if (id1 === undefined || id2 === undefined) {
			throw new Error(`Invalid id ${id1} or ${id2}`);
		}

		return Math.abs(id1 - id2);
	}

	function getTotalDistance(arr1, arr2, totalDistance = 0) {
		let smallest1 = getSmallestId(arr1);
		let smallest2 = getSmallestId(arr2);

		arr1.splice(arr1.indexOf(smallest1), 1);
		arr2.splice(arr2.indexOf(smallest2), 1);

		const distance = getDistance(smallest1, smallest2);
		totalDistance += distance;

		if (arr1.length === 0) {
			return totalDistance;
		}

		return getTotalDistance(arr1, arr2, totalDistance);
	}

	const lines = input.split("\n");

	const list1 = [];
	const list2 = [];
	lines.forEach((line) => {
		const [a, b] = line.split("   ").map(Number);

		list1.push(a);
		list2.push(b);
	});

	return getTotalDistance(list1, list2);
}

function part2(input) {
	function getSimilarityScore(list1, list2, score = 0) {
		let cur = list1[0];
		let occurrences = list2.filter((id) => id === cur).length;
		score += occurrences * cur;

		list1.splice(0, 1);

		if (list1.length === 0) {
			return score;
		}

		return getSimilarityScore(list1, list2, score);
	}

	const lines = input.split("\n");

	const list1 = [];
	const list2 = [];

	lines.forEach((line) => {
		const [a, b] = line.split("   ").map(Number);
		list1.push(a);
		list2.push(b);
	});

	return getSimilarityScore(list1, list2);
}