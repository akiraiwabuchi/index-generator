'use strict';

const indexGenerator = require('./index.js');

describe('adaptive', () => {
	let config = {
		htmlPath: './sample/',
		distPath: './sample/',
		construction: 'adaptive'
	};
	test('test', () => {
		expect(indexGenerator(config)).toMatchObject();
	});
});
