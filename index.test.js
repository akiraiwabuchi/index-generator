'use strict';

const indexGenerator = require('./index.js');

describe('responsive', () => {
	let config = {
		construction: 'responsive'
	};
	test('myTest', () => {
		expect(indexGenerator(config)).toBe(1);
	});
});
