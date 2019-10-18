'use strict';

const fs = require('fs');

function indexGenerator (config) {

	// user settings
	let htmlPath = config.htmlPath || './html/';
	let distPath = config.distPath || htmlPath;
	let fileName = config.fileName || 'index.html';

	const colorModeSet = {
		light: {// Light Color
			bodyBg : '#ffffff',
			bodyColor : '#343a40',
			badgeClass : ' badge-dark ',
			buttonClass : ' btn-light ',
			borderColor : '',
			mutedColor : '#afb6bc',
			listGroupItemHover : ''
		},
		dark: {// Dark Color
			bodyBg : '#292e33',
			bodyColor : '#f8f9fa',
			badgeClass : ' bg-white text-dark ',
			buttonClass : ' bg-dark text-light ',
			borderColor : ' border-secondary ',
			mutedColor : '#6c757d',
			listGroupItemHover : ''
		}
	};
	let darkMode = config.darkMode || false;
	let colorMode;
	if(!darkMode) {
		colorMode = colorModeSet.light;
	} else {
		colorMode = colorModeSet.dark;
	}

	let deviceIcons = ["devices","desktop_mac","phone_iphone","tablet_mac"];
	let construction = config.construction || 'responsive';

	// Prefix
	let prefix = config.prefixGroup || [
		{
			prefixName: '',
			title: '',
			titleIcon: ''
		}
	];

	// Suffix(adaptive only)
	let suffixDesktop = config.suffixDesktop || '-desktop.html';
	let suffixMobile = config.suffixMobile || '-mobile.html';
	let suffixTablet = config.suffixTablet || '-tablet.html';

	let removeTitle = config.removeTitle || '';
	let faviconPath = config.faviconPath || '';
	let headTitle = config.headTitle || 'index';
	let pageTitle = config.pageTitle || 'pageTitle';
	let overview = config.overview || 'Overview text sample.';
	let disclaimerTitle = config.disclaimerTitle || 'Disclaimer title sample';
	let disclaimerDesc = config.disclaimerDesc || 'Disclaimer description sample.';
	let copyright = config.copyright || '&copy; CopyrightSample.Inc';

	fs.readdir(htmlPath, (err, data) => {
		if (err) throw err;
		let containerHtmlFiles = [];
		var regexp = new RegExp('^.*.html');
		for (var i in data) {
			if (data[i].match(regexp) && !data[i].match(fileName)) {
				let src = fs.readFileSync(htmlPath + data[i], 'utf-8');
				let title = src.match(/<title>.*<\/title>/g);
				title = title[0].replace(/<title>/g, '').replace(removeTitle, '').replace(/<\/title>/g, '');
				containerHtmlFiles.push({
					file: data[i],
					title: title
				});
			}
		}
	
		// commonHTML
		let htmlContents = [
			'<!DOCTYPE html><html lang="ja">',
			'<head>',
				'<meta charset="utf-8">',
				'<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">',
				'<link rel="icon" href="' + faviconPath + '">',
				'<title>' + headTitle + '</title>',
				'<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
				'<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">',
				'<link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP|Roboto&display=swap" rel="stylesheet">',
				'<style>',
					'html{font-size:.875em;}',
					'body{background-color:' + colorMode.bodyBg + ';color:' + colorMode.bodyColor + ';font-family:"Roboto","Noto Sans JP",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";}',
					'h2{font-size:1.3rem;}',
					'.muted-color{color:' + colorMode.mutedColor + ';}',
					'.pointer-events-none{pointer-events: none;}.list-group-item:hover{z-index:1;border-color:' + colorMode.listGroupItemHover + ';}',
					'@media (min-width: 768px) { .w-md-100{width: 100% !important;} }',
				'</style>',
			'</head>',
			'<body>',
				'<div class="container pt-5 pb-2">',
					'<div class="row mb-5">',
						'<div class="col-sm-12">',
							'<h1>' + pageTitle + '</h1>',
							'<p>' + overview + '</p>',
		].join('');
		if (construction == 'adaptive') {
			htmlContents += [
				'<h5 class="pr-2 pl-2 d-inline-flex align-items-center badge ' + colorMode.badgeClass + '"><span class="mr-1">Adaptive</span><i class="material-icons lead">' + deviceIcons[1] + '</i><i class="material-icons lead">' + deviceIcons[2] + '</i><i class="material-icons lead">' + deviceIcons[3] + '</i></h5>'
			].join('');
		}
		if (construction == 'responsive') {
			htmlContents += [
				'<h5 class="pr-2 pl-2 d-inline-flex align-items-center badge ' + colorMode.badgeClass + '"><span class="mr-1">Responsive</span><i class="material-icons lead">' + deviceIcons[0] + '</i></h5>'
			].join('');
		}
		htmlContents += '</div></div>';
	
		// ====================================================================================
		// Adaptive file sort
		// ====================================================================================
	
		let fileEquip;
		let iconFileCount = 0;

		function fileSort() {
			let fileNext = parseInt(i) + 1;
			let fileNextNext = parseInt(i) + 2;
			let filePrev = parseInt(i) - 1;
			let fileCurrentId = containerHtmlFiles[i].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// Get current file name（State without suffix）
			let filePrevId;
	
			if (containerHtmlFiles[fileNext] !== undefined){// If the file exists after the current file
				var fileNextId = containerHtmlFiles[fileNext].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// Get next file name（State without suffix）
				if (fileCurrentId === fileNextId) {// The current file name is the same as the following file
					fileTypeCheck();
				} else {// The current file name does not match the next file
					if (containerHtmlFiles[filePrev] !== undefined){// If the file exists before the current file
						filePrevId = containerHtmlFiles[filePrev].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// Get previous file name（State without suffix）
						if (fileCurrentId === filePrevId) {// The current file name is the same as the previous file
							fileTypeCheck();
						} else {// Files without device siblings
							fileTypeCheckSingle();
						}
					} else {// First file except index.html, no device sibling
						fileTypeCheckSingle();
					}
				}
			} else {// The file does not exist after the current file
				if (containerHtmlFiles[filePrev] !== undefined){// If the previous file exists
					filePrevId = containerHtmlFiles[filePrev].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// Get previous file name（State without suffix）
					if (fileCurrentId === filePrevId) {// The current file name is the same as the previous file
						fileTypeCheck();
					} else {// Last file except index.html and no device sibling
						fileTypeCheckSingle();
					}
				} else {// index.html and only you
				}
			}
			// Determine which device this file is.( Where the device brothers arrive. 2 or more identical files confirmed )
			function fileTypeCheck() {
				if ((containerHtmlFiles[i].file.lastIndexOf(suffixDesktop)+suffixDesktop.length===containerHtmlFiles[i].file.length)&&(suffixDesktop.length<=containerHtmlFiles[i].file.length)) {// check if it is desktop
					// Confirm Desktop===========
					if (containerHtmlFiles[fileNextNext] !== undefined){// If the next of the following files exists
						let fileNextNextId = containerHtmlFiles[fileNextNext].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");
						if (fileCurrentId === fileNextNextId) {// The current file name is the next next file name [Desktop & Mobile & Tablet]
							fileEquip = { type:'all', device:'desktop', icon:deviceIcons[1], file:containerHtmlFiles[i].file };
						} else {// The next next file is another file [Desktop & Mobile or Tablet]
							if ((containerHtmlFiles[fileNext].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[fileNext].file.length)&&(suffixMobile.length<=containerHtmlFiles[fileNext].file.length)) {// Determine if next file is mobile
								fileEquip = { type:'dm', device:'desktop', icon:deviceIcons[1], file:containerHtmlFiles[i].file };
							} else {// dt
								fileEquip = { type:'dt', device:'desktop', icon:deviceIcons[1], file:containerHtmlFiles[i].file };
							}
						}
					} else {// The following next file does not exist [Desktop & Mobile or Tablet]
						if ((containerHtmlFiles[fileNext].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[fileNext].file.length)&&(suffixMobile.length<=containerHtmlFiles[fileNext].file.length)) {// Determine if next file is mobile
							fileEquip = { type:'dm', device:'desktop', icon:deviceIcons[1], file:containerHtmlFiles[i].file };
						} else {// dt
							fileEquip = { type:'dt', device:'desktop', icon:deviceIcons[1], file:containerHtmlFiles[i].file };
						}
					}
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[i].file.length)&&(suffixMobile.length<=containerHtmlFiles[i].file.length)) {// check if it is mobile
					// Mobile verification zone ==========================================================================
					if (containerHtmlFiles[filePrev] !== undefined){// If the previous file exists
						let filePrevId = containerHtmlFiles[filePrev].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");
						if (fileCurrentId === filePrevId) {// The current file name is the same as the previous file [Desktop & Mobile]
							if (fileCurrentId === fileNextId) {// [Desktop & Mobile & Tablet]
								fileEquip = { type:'all', device:'mobile', icon:deviceIcons[2], file:containerHtmlFiles[i].file };
							} else {// [Desktop & Mobile]
								fileEquip = { type:'dm', device:'mobile', icon:deviceIcons[2], file:containerHtmlFiles[i].file };
							}
						} else {// Current file name does not match previous file
							if (fileCurrentId === fileNextId) {// The current file name is the same as [Mobile & Tablet]
								fileEquip = { type:'mt', device:'mobile', icon:deviceIcons[2], file:containerHtmlFiles[i].file };
							}
						}
					} else {// If there is no previous file and the next file exists
						if (fileCurrentId === fileNextId) {// The current file name is the same as [Mobile & Tablet]
							fileEquip = { type:'mt', device:'mobile', icon:deviceIcons[2], file:containerHtmlFiles[i].file };
						}
					}
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixTablet)+suffixTablet.length===containerHtmlFiles[i].file.length)&&(suffixTablet.length<=containerHtmlFiles[i].file.length)) {// check if it is tablet
					fileEquip = { type:'all', device:'tablet', icon:deviceIcons[3], file:containerHtmlFiles[i].file };// If Type is other than Only, it is a tablet
				}
			}
			// determine which device [no device sibling]
			function fileTypeCheckSingle() {
				if ((containerHtmlFiles[i].file.lastIndexOf(suffixDesktop)+suffixDesktop.length===containerHtmlFiles[i].file.length)&&(suffixDesktop.length<=containerHtmlFiles[i].file.length)) {// check if it is desktop [Desktop Only]
					fileEquip = { type:'only', device:'desktop', icon:deviceIcons[1], file:containerHtmlFiles[i].file };
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[i].file.length)&&(suffixMobile.length<=containerHtmlFiles[i].file.length)) {// check if it is mobile [Mobile Only]
					fileEquip = { type:'only', device:'mobile', icon:deviceIcons[2], file:containerHtmlFiles[i].file };
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixTablet)+suffixTablet.length===containerHtmlFiles[i].file.length)&&(suffixTablet.length<=containerHtmlFiles[i].file.length)) {// check if it is tablet [Tablet Only]
					fileEquip = { type:'only', device:'tablet', icon:deviceIcons[3], file:containerHtmlFiles[i].file };
				}
			}
		}
		// reusable html
		let listGroupItem = '<div class="d-flex justify-content-between list-group-item overflow-hidden p-0 ' + colorMode.borderColor + '">';
		let col8Class = 'col-8 d-md-flex justify-content-between align-items-center p-3 overflow-hidden text-decoration-none ';
		let col2Class = 'col-2 border-left d-flex justify-content-center justify-content-md-start align-items-center p-3 overflow-hidden text-decoration-none ';
		//
		function fileOutput(value) {
			// reusable html
			let blankMobile = '<div class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + ' pointer-events-none"><i class="material-icons mr-md-3 muted-color">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline muted-color">Mobile</p></div>';
			let blankTablet = '<div class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + ' pointer-events-none"><i class="material-icons mr-md-3 muted-color">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline muted-color">Tablet</p></div>';
			let blankDesktop = '<div class="' + col8Class + colorMode.buttonClass + 'pointer-events-none"><div class="d-flex align-items-center w-md-100 row"><div class="col-9 mb-0">';
			if (value.fileIcon) {
				if (value.fileIcon[iconFileCount] !== undefined) { blankDesktop += '<i class="material-icons mr-3 display-4 d-none d-md-inline">' + value.fileIcon[iconFileCount] + '</i>'; }
			}
			blankDesktop += '<p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div><div class="d-flex align-items-center justify-content-center justify-content-md-start col-3"><i class="material-icons mr-md-3 muted-color">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline muted-color">Desktop</p></div></div></div>';
	
			if (fileEquip.type === 'all') {// [All] do not output empty files
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href="' + containerHtmlFiles[i].file + '" class="' + col8Class + colorMode.borderColor + colorMode.buttonClass + '"><div class="d-flex align-items-center w-md-100 row"><div class="col-9 mb-0 d-flex align-items-center">';
					if (value.fileIcon) {
						if (value.fileIcon[iconFileCount] !== undefined) { htmlContents += '<i class="material-icons mr-3 display-4 d-none d-md-inline">' + value.fileIcon[iconFileCount] + '</i>'; }
					}
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class="d-flex align-items-center justify-content-center justify-content-md-start col-3"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>';
				} else if (fileEquip.device === 'mobile') {
					htmlContents += '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>';
				} else if (fileEquip.device === 'tablet') {
					htmlContents += '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			} else if (fileEquip.type === 'dm') {// [Desktop & Mobile] mobile outputs an empty file on the tablet
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href="' + containerHtmlFiles[i].file + '" class="' + col8Class + colorMode.borderColor + colorMode.buttonClass + '"><div class="d-flex align-items-center w-md-100 row"><div class="col-9 mb-0 d-flex align-items-center">';
					if (value.fileIcon) {
						if (value.fileIcon[iconFileCount] !== undefined) { htmlContents += '<i class="material-icons mr-3 display-4 d-none d-md-inline">' + value.fileIcon[iconFileCount] + '</i>'; }
					}
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class="d-flex align-items-center justify-content-center justify-content-md-start col-3"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>';
				} else if (fileEquip.device === 'mobile') {
					htmlContents += '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>' + blankTablet + '</div>';
				}
			} else if (fileEquip.type === 'dt') {// [Desktop & Tablet] desktop outputs an empty file on the mobile
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href="' + containerHtmlFiles[i].file + '" class="' + col8Class + colorMode.borderColor + colorMode.buttonClass + '"><div class="d-flex align-items-center w-md-100 row"><div class="col-9 mb-0 d-flex align-items-center">';
					if (value.fileIcon) {
						if (value.fileIcon[iconFileCount] !== undefined) { htmlContents += '<i class="material-icons mr-3 display-4 d-none d-md-inline">' + value.fileIcon[iconFileCount] + '</i>'; }
					}
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class="d-flex align-items-center justify-content-center justify-content-md-start col-3"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>' + blankMobile;
				} else if (fileEquip.device === 'tablet') {
					htmlContents += '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			} else if (fileEquip.type === 'mt') {// [Mobile & Tablet] mobile outputs an empty file on the desktop
				if (fileEquip.device === 'mobile') {
					htmlContents += listGroupItem + blankDesktop + '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>';
				} else if (fileEquip.device === 'tablet') {
					htmlContents += '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			} else if (fileEquip.type === 'only') {// [ONLY] output two empty files
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href="' + containerHtmlFiles[i].file + '" class="' + col8Class + colorMode.borderColor + colorMode.buttonClass + '"><div class="d-flex align-items-center w-md-100 row"><div class="col-9 mb-0 d-flex align-items-center">';
					if (value.fileIcon) {
						if (value.fileIcon[iconFileCount] !== undefined) { htmlContents += '<i class="material-icons mr-3 display-4 d-none d-md-inline">' + value.fileIcon[iconFileCount] + '</i>'; }
					}
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class="d-flex align-items-center justify-content-center justify-content-md-start col-3"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>' + blankMobile + blankTablet + '</div>';
				} else if (fileEquip.device === 'mobile') {
					htmlContents += listGroupItem + blankDesktop + '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>' + blankTablet + '</div>';
				} else if (fileEquip.device === 'tablet') {
					htmlContents += listGroupItem + blankDesktop + blankMobile + '<a href="' + containerHtmlFiles[i].file + '" class="' + col2Class + colorMode.borderColor + colorMode.buttonClass + '"><i class="material-icons mr-md-3">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			}
		}
		// ====================================================================================
		// Adaptive
		// ====================================================================================
		if (construction == 'adaptive') {
			prefix.forEach( function(value) {
				htmlContents += '<div class="row mb-5"><div class="col-sm-12">';
				if(value.title !== undefined) {// title available
					htmlContents += '<div class="d-flex align-items-center mb-3">';
					if(value.titleIcon !== undefined) {// titleIcon available
						htmlContents += ['<i class="material-icons mr-1">' + value.titleIcon + '</i>'].join('');
					}
					htmlContents += ['<h2 class="mb-0">' + value.title + '</h2></div>'].join('');
				}
				htmlContents += '<div class="list-group">';
				for (i in containerHtmlFiles) {
					if (!containerHtmlFiles[i].file.indexOf(value.prefixName)) {
						fileSort(value);
						fileOutput(value);
					}
					iconFileCount++;
				}
				htmlContents += '</div></div></div>';
			});
		}
		// ====================================================================================
		// Responsive
		// ====================================================================================
		if (construction == 'responsive') {
			prefix.forEach( function(value) {
				htmlContents += '<div class="row mb-5"><div class="col-sm-12">';
				if(value.title !== undefined) {// title available
					htmlContents += '<div class="d-flex align-items-center mb-3">';
					if(value.titleIcon !== undefined) {// titleIcon available
						htmlContents += ['<i class="material-icons mr-1">' + value.titleIcon + '</i>'].join('');
					}
					htmlContents += ['<h2 class="mb-0">' + value.title + '</h2></div>'].join('');
				}
				if(value.fileIcon !== undefined) {// icon available
					htmlContents += '<div class="row mb-5">';
					let iconFileCount = 0;
					for (i in containerHtmlFiles) {
						if (!containerHtmlFiles[i].file.indexOf(value.prefixName)) {
							htmlContents += '<div class="col-md-3 mt-2 mb-2"><a href="' + containerHtmlFiles[i].file + '" class="h-100 btn btn-block list-group-item text-center pt-4 pb-4 pl-2 pr-2 ' + colorMode.borderColor + ' overflow-hidden ' + colorMode.buttonClass + '"><div class="mb-1">';
							if (value.fileIcon[iconFileCount] !== undefined) {
								htmlContents += '<i class="material-icons display-4">' + value.fileIcon[iconFileCount] + '</i>';
							}
							htmlContents += '</div><h2 class="mb-0">' + containerHtmlFiles[i].title + '</h2><div><small class="muted-color">' + containerHtmlFiles[i].file + '</small></div></a></div>';
							iconFileCount++;
						}
					}
					htmlContents += '</div>';
				} else {// icon not available
					htmlContents += [
						'<div class="list-group">'
					].join('');
					for (i in containerHtmlFiles) {
						if (!containerHtmlFiles[i].file.indexOf(value.prefixName)) {
							htmlContents += '<a href="' + containerHtmlFiles[i].file + '" class="list-group-item list-group-item-action d-md-flex justify-content-between align-items-center ' + colorMode.borderColor + ' overflow-hidden ' + colorMode.buttonClass + '">' + containerHtmlFiles[i].title + '<div> <small class="muted-color">' + containerHtmlFiles[i].file + '</small></div></a>';
						}
					}
					htmlContents += '</div>';
				}
				htmlContents += '</div></div>';
			});
		}
		// commonHTML
		htmlContents += '<div class="row"><div class="col-sm-12"><dl><dt>' + disclaimerTitle + '</dt><dd>' + disclaimerDesc + '</dd></dl><hr class="' + colorMode.borderColor + '"><p class="muted-color text-center"><small>' + copyright + '</small></p></div></div></div></body></html>';
		fs.writeFile(distPath + fileName, htmlContents, function (err) {
			if (err) throw err;
		});
	});
}

module.exports = indexGenerator;