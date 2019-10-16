'use strict';

const indexGenerator = require('./index.js');

describe('adaptive', () => {
	let config = {
		htmlPath: './test/',
		distPath: './test/',
		construction: 'adaptive',
		prefixGroup: [
			{
				prefixName: 'd',
				title: 'Develop',
				titleIcon: 'keyboard',
				fileIcon: ["style","","","view_compact","","mood","code"]
			},
			{
				prefixName: 'p',
				title: 'Pages',
				titleIcon: 'description'
			},
			{
				prefixName: 'w',
				title: 'WorkSpace',
				titleIcon: 'create'
			}
		],
	};
	test('test', () => {
		expect(indexGenerator(config)).toBe(3);
	});
});
