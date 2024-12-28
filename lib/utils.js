import fs from 'fs';

export function run(label, func, input) {
	const start = performance.now();
	const output = func(input);
	const end = performance.now();
	console.info(`${label}: ${(end - start).toFixed(3)}ms`);
	console.info(output);
}

export function readInputs(dirname, file1, file2) {
	const input1 = fs.readFileSync(`${dirname}/${file1}`, 'utf8');
	const input2 = fs.readFileSync(`${dirname}/${file2}`, 'utf8');
	return {input1, input2};
}