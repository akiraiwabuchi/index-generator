'use strict';

const indexGenerator = require('./index.js');

describe('default responsive', () => {
	test('default', async () => {
		const result = await indexGenerator();
		expect(result).toBe(0);
	});
	test('no prefixGroup', async () => {
		const result = await indexGenerator({
			htmlPath: './test/',
			distPath: './test/'
		});
		expect(result).toBe(20);
	});
	test('full', async () => {
		const result = await indexGenerator({
			htmlPath: './test/',
			distPath: './test/',
			fileName: 'index.html',
			darkMode: true,
			construction: 'responsive',
			prefixGroup: [
				{
					prefixName: 'd',
					title: 'Develop',
					titleIcon: 'keyboard',
					fileIcon: ["style","",undefined,"view_compact","","mood","code"]
				},
				{
					prefixName: 'p',
					title: 'Pages',
					titleIcon: 'description'
				},
				{
					prefixName: 'w',
					title: 'WorkSpace'
				}
			],
			suffixDesktop: '-desktop.html',
			suffixMobile: '-mobile.html',
			suffixTablet: '-tablet.html',
			removeTitle: ' | TEST FILE',
			faviconPath: './image/favicon.ico',
			headTitle: 'headTitle',
			pageTitle: 'sakon',
			overview: 'overview',
			disclaimerTitle: 'disclaimerTitle',
			disclaimerDesc: 'disclaimerDesc',
			copyright: '&copy; CopyrightSample.Inc'
		});
		expect(result).toBe(60);
	});
});

describe('adaptive', () => {
	test('no prefixGroup', async () => {
		const result = await indexGenerator({
			htmlPath: './test/',
			distPath: './test/',
			construction: 'adaptive'
		});
		expect(result).toBe(20);
	});
	test('full', async () => {
		const result = await indexGenerator({
			htmlPath: './test/',
			distPath: './test/',
			darkMode: true,
			construction: 'adaptive',
			prefixGroup: [
				{
					prefixName: 'd',
					title: 'Develop',
					titleIcon: 'keyboard',
					fileIcon: ["style","",undefined,"view_compact","","mood","code"]
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
			removeTitle: ' | TEST FILE',
			faviconPath: './image/favicon.ico'
		});
		expect(result).toBe(60);
	});
	test('first file and not device brother', async () => {
		const result = await indexGenerator({
			htmlPath: './test/test-first/',
			distPath: './test/test-first/',
			construction: 'adaptive'
		});
		expect(result).toBe(2);
	});
	test('only file', async () => {
		const result = await indexGenerator({
			htmlPath: './test/test-single/',
			distPath: './test/test-single/',
			construction: 'adaptive'
		});
		expect(result).toBe(1);
	});
	test('last file and yes device brother', async () => {
		const result = await indexGenerator({
			htmlPath: './test/test-last/',
			distPath: './test/test-last/',
			construction: 'adaptive'
		});
		expect(result).toBe(2);
	});
	test('dt', async () => {
		const result = await indexGenerator({
			htmlPath: './test/test-dt/',
			distPath: './test/test-dt/',
			construction: 'adaptive',
			prefixGroup: [
				{
					prefixName: 'd',
					title: 'Develop',
					fileIcon: ["style","code"]
				},
			]
		});
		expect(result).toBe(2);
	});
	test('mt', async () => {
		const result = await indexGenerator({
			htmlPath: './test/test-mt/',
			distPath: './test/test-mt/',
			construction: 'adaptive'
		});
		expect(result).toBe(2);
	});
});