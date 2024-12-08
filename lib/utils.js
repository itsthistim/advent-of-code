import fs from 'fs';

export function run(label, func, input) {
	const start = performance.now();
	console.info(func(input));
	const end = performance.now();
	console.log(`${label}: ${end - start}ms`);
	console.log();
}

export function readInputs(dirname, file1, file2) {
	const input1 = fs.readFileSync(`${dirname}/${file1}`, 'utf8');
	const input2 = fs.readFileSync(`${dirname}/${file2}`, 'utf8');
	return { input1, input2 };
}