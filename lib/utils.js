export function run(label, func, input) {
	const start = performance.now();
	console.info(func(input));
	const end = performance.now();
	console.log(`${label}: ${end - start}ms`);
	console.log();
}