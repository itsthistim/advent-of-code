require('dotenv').config();
const { hrtime } = require('process');

const loadInput = require('aoc-loader');
const { yellow, black } = require('colorette');

async function main() {
	let actual = await loadInput(2023, 4);

	let test = `seeds: 79  4 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

	let startTime = hrtime();
	const part1 = await day4(test);
	let endTime = hrtime(startTime);

	console.info(yellow(part1), black('\t(Part 1)'), black(`(${(endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)}ms)`));

	startTime = hrtime();
	const part2 = await day4_part2(test);
	endTime = hrtime(startTime);

	console.info(yellow(part2), black('\t(Part 2)'), black(`(${(endTime[0] * 1000 + endTime[1] / 1000000).toFixed(3)}ms)`));
}

async function day4(input) {
	let lines = input.split('\n');
	let result = 0;

	let seeds = [];

	// let seeds = lines[0]
	// 	.split('seeds: ')[1]
	// 	.split(' ')
	// 	.map((x) => parseInt(x))
	// 	.filter((x) => !isNaN(x));

	let seedToSoilMappings = [];

	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith('seeds:')) {
			seeds = lines[i]
				.split('seeds: ')[1]
				.split(' ')
				.map((x) => parseInt(x))
				.filter((x) => !isNaN(x));
		}

		if (lines[i].startsWith('seed-to-soil map:')) {
			i++;
			while (lines[i].match(/^\d/g)) {
				let mapping = {};

				let values = lines[i]
					.split(' ')
					.map((x) => parseInt(x))
					.filter((x) => !isNaN(x));

				mapping.destination_range_start = values[0];
				mapping.source_range_start = values[1];
				mapping.range_length = values[2];

				seedToSoilMappings.push(mapping);
				i++;
			}
		}
	}

	/* Resolve Mapping
	
	destination_range_start = 50
	source_range_start = 98
	range_length = 2

	In this case, destination is the seed and source is the soil
	This means seed number 50 belongs to soil number 98
	Seed number 51 belongs to soil number 99

	Up to seed number 50, the mapping is just 1:1

	*/

	let seedToSoilMap = new Map();

	seedToSoilMappings.forEach((mapping) => {
		// source: seed
		// destination: soil

		let seedRange = mapping.source_range_start + mapping.range_length;

		for (let i = 0; i < seedRange; i++) {
			while (i < mapping.source_range_start) {
				seedToSoilMap.set(i, i);
				i++;
			}

			seedToSoilMap.set(i, mapping.destination_range_start + i - mapping.source_range_start);
		}
	});

	console.log(seedToSoilMap);
}

async function day4_part2(input) {}

main();
