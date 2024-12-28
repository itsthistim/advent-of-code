import { readInputs, run } from "../../lib/utils.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { input1, input2 } = readInputs(__dirname, "input1.txt", "input2.txt");

run("Part 1", part1, input1);

function part1(input) {
	const calibrations = input.split("\r\n");
	const operators = ["+", "*"];

	let total = 0;

	for (let i = 0; i < calibrations.length; i++) {
		const calibration = calibrations[i];
		const [testValueStr, valuesStr] = calibration.split(":");
		const testValue = Number(testValueStr.trim());
		const values = valuesStr.trim().split(" ").map(Number);

		if (isValid(testValue, values)) {
			total += testValue;
		}
	}

	return total;

	function evaluateExpression(numbers, ops) {
		let result = numbers[0];
		for (let i = 0; i < ops.length; i++) {
			if (ops[i] === "+") {
				result += numbers[i + 1];
			} else if (ops[i] === "*") {
				result *= numbers[i + 1];
			}
		}
		return result;
	}

	function isValid(testValue, values) {
		const numOperators = values.length - 1;
		const totalCombinations = Math.pow(operators.length, numOperators);

		for (let i = 0; i < totalCombinations; i++) {
			let ops = [];
			let temp = i;

			for (let j = 0; j < numOperators; j++) {
				ops.push(operators[temp % operators.length]);
				temp = Math.floor(temp / operators.length);
			}

			if (evaluateExpression(values, ops) === testValue) {
				return true;
			}
		}
		return false;
	}
}
