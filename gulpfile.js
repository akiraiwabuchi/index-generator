'use strict';

const gulp = require('gulp');
const lcs = require('node-lcs');
const fs = require('fs');
const config = require('./gulpconfig.json');

async function makeIndex() {

	// user settings

	const htmldir = './html/';
	const outputdir = htmldir;
	const outputname = 'index.html';

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
	}
	const colorMode = colorModeSet.dark;// Color Mode choice

	// Google Material Icons
	const deviceIcons = ["devices","desktop_mac","phone_iphone","tablet_mac"];// デバイスのアイコン
	const IconsResponsive = ["style","view_compact","mood","code"];// アイコン（Responsive）
	const IconsAdaptive = ["style","","","view_compact","","mood","code"];// アイコン（Adaptive）

	// Prefixの指定
	const prefixDev = 'd';// 開発
	const prefixPage = 'p';// ページ
	const prefixWork = 'w';// ワークスペース

	// Prefixによるタイトルの設定
	const DevTitle = 'Develop';
	const DevTitleIcon = 'keyboard';// Google Material Iconsの設定
	const PageTitle = 'Pages';
	const PageTitleIcon = 'description';// Google Material Iconsの設定
	const WorkTitle = 'Works';
	const WorkTitleIcon = 'create';// Google Material Iconsの設定

	// Suffixの設定（Adaptiveのみ機能）
	const suffixDesktop = '-desktop.html';// Desktopの定義
	const suffixMobile = '-mobile.html';// Mobileの定義
	const suffixTablet = '-tablet.html';// Tabletの定義

	// 文言設定
	const pageTitle = config.company + ' ' + config.site + ' Base Coding';
	const h1Title = config.site + ' <small class=\"muted-color\">' + config.company + '</small>';
	const outlineTxt = config.site + ' - ' + config.project + ' base coding.';
	const disclaimer = 'Disclaimer';
	const disclaimerTxt = 'Disclaimer Text.';
	const copyright = '&copy; Copyright.Inc';

	fs.readdir(htmldir, function (err, data) {
		if (err) throw err;
		var containerHtmlFiles = [];
		for (var i in data) {
			var regexp = new RegExp('^(?!index\.html).*\.html');
			if (data[i].match(regexp) && !data[i].match(/index\.html/g)) {
				var src = fs.readFileSync(htmldir + data[i], 'utf-8');
				var title = src.match(/<title>.*<\/title>/g);
				title = title[0].replace(/<title>/g, '').replace(/<\/title>/g, '');
				containerHtmlFiles.push({
					file: data[i],
					title: title
				});
			}
		}

		if (containerHtmlFiles.length > 1) {
			var containerHtmlFilesCount = containerHtmlFiles.length - 1;
			var lcsText = lcs(containerHtmlFiles[0].title, containerHtmlFiles[containerHtmlFilesCount].title).sequence;
			for (i in containerHtmlFiles) {
				containerHtmlFiles[i].title = containerHtmlFiles[i].title.replace(lcsText, '');
			}
		}

		var htmlContents = [
			'<!DOCTYPE html><html lang=\"ja\">',
			'<head>',
				'<meta charset=\"utf-8\">',
				'<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">',
				'<title>' + pageTitle + '</title>',
				'<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">',
				'<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">',
				'<link href=\"https://fonts.googleapis.com/css?family=Noto+Sans+JP|Roboto&display=swap\" rel=\"stylesheet\">',
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
				'<div class=\"container pt-5 pb-2\">',
					'<div class=\"row mb-5\">',
						'<div class=\"col-sm-12\">',
							'<h1>' + h1Title + '</h1>',
							'<p>' + outlineTxt + '</p>',
		].join('');
		if (config.construction == 'adaptive') {
			htmlContents += [
				'<h5 class=\"pr-2 pl-2 d-inline-flex align-items-center badge ' + colorMode.badgeClass + '\"><span class=\"mr-1\">Adaptive</span>'
			].join('');
			if (config.device.desktop === true) { htmlContents += '<i class=\"material-icons lead\">' + deviceIcons[1] + '</i>'; }
			if (config.device.mobile === true) { htmlContents += '<i class=\"material-icons lead\">' + deviceIcons[2] + '</i>'; }
			if (config.device.tablet === true) { htmlContents += '<i class=\"material-icons lead\">' + deviceIcons[3] + '</i>'; }
			htmlContents += '</h5>';
		}
		if (config.construction == 'responsive') {
			htmlContents += [
				'<h5 class=\"pr-2 pl-2 d-inline-flex align-items-center badge ' + colorMode.badgeClass + '\"><span class=\"mr-1\">Responsive</span><i class=\"material-icons lead\">' + deviceIcons[0] + '</i></h5>'
			].join('');
		}
		htmlContents += ['</div></div><div class=\"row mb-5\"><div class=\"col-sm-12\"><div class=\"d-flex align-items-center mb-3\"><i class=\"material-icons mr-1\">' + DevTitleIcon + '</i><h2 class=\"mb-0\">' + DevTitle + '</h2></div>'].join('');

		// ====================================================================================
		// Adaptive 専用 ファイル処理
		// ====================================================================================
		
		// Global変数
		var fileEquip;// ソート後に各ファイルに格納される配列用
		var iconFileCount = 0;// 先頭につくアイコン配列回し用

		// suffix外しの処理をここにまとめたい
		// function deleteSuffix() {
		// }

		// 自分の立ち位置を判定する
		function fileSort() {
			var fileNext = parseInt(i) + 1;// 次のファイルの配列番号を取得
			var fileNextNext = parseInt(i) + 2;// 次の次のファイルの配列番号を取得
			var filePrev = parseInt(i) - 1;// 前のファイルの配列番号を取得
			var fileCurrentId = containerHtmlFiles[i].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// 現在のファイル名を取得（suffixを外した状態）
			var filePrevId;

			if (containerHtmlFiles[fileNext] !== undefined){// 現在のファイルの次にファイルが存在する場合
				var fileNextId = containerHtmlFiles[fileNext].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// 次のファイル名を取得（suffixを外した状態）
				if (fileCurrentId === fileNextId) {// 現在のファイル名が次のファイルと同じ
					fileTypeCheck();
				} else {// 現在のファイル名が次のファイルと不一致
					if (containerHtmlFiles[filePrev] !== undefined){// 現在のファイルの前にファイルが存在する場合
						filePrevId = containerHtmlFiles[filePrev].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// 前のファイル名を取得（suffixを外した状態）
						if (fileCurrentId === filePrevId) {// 現在のファイル名が前のファイルと同じ
							fileTypeCheck();
						} else {// デバイス兄弟がいないファイル
							fileTypeCheckSingle();
						}
					} else {// index.htmlを除く一番最初のファイルかつ、デバイス兄弟がいない
						fileTypeCheckSingle();
					}
				}
			} else {// 現在のファイルの次にファイルが存在しない
				if (containerHtmlFiles[filePrev] !== undefined){// 前のファイルが存在する場合
					filePrevId = containerHtmlFiles[filePrev].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");// 前のファイル名を取得（suffixを外した状態）
					if (fileCurrentId === filePrevId) {// 現在のファイル名が前のファイルと同じ
						fileTypeCheck();
					} else {// index.htmlを除く一番最後のファイルかつ、デバイス兄弟がいない
						fileTypeCheckSingle();
					}
				} else {// index.htmlとふたりきり、そもそもエラーで4つ以上ないと生成されないので処理はない
				}
			}
			// 自分がどのデバイスか判定する。デバイス兄弟がいるものが辿り着く場所。確定で２つ以上同じファイルがある
			function fileTypeCheck() {
				if ((containerHtmlFiles[i].file.lastIndexOf(suffixDesktop)+suffixDesktop.length===containerHtmlFiles[i].file.length)&&(suffixDesktop.length<=containerHtmlFiles[i].file.length)) {// 自分がDesktopかチェック
					// Desktop確定ゾーン===================================================================================================================
					if (containerHtmlFiles[fileNextNext] !== undefined){// 次の次のファイルが存在する場合
						var fileNextNextId = containerHtmlFiles[fileNextNext].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");
						if (fileCurrentId === fileNextNextId) {// 現在のファイル名が次の次と同じ、[Desktop & Mobile & Tablet]
							fileEquip = { type:'all', device:'desktop', icon:deviceIcons[1], file:fileCurrentId };
						} else {// 次の次のファイルは違うファイル、[Desktop & Mobile or Tablet]
							if ((containerHtmlFiles[fileNext].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[fileNext].file.length)&&(suffixMobile.length<=containerHtmlFiles[fileNext].file.length)) {// 次のファイルがモバイルかを判別する
								fileEquip = { type:'dm', device:'desktop', icon:deviceIcons[1], file:fileCurrentId };
							} else {// dt確定
								fileEquip = { type:'dt', device:'desktop', icon:deviceIcons[1], file:fileCurrentId };
							}
						}
					} else {// 次の次のファイルはない、[Desktop & Mobile or Tablet]
						if ((containerHtmlFiles[fileNext].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[fileNext].file.length)&&(suffixMobile.length<=containerHtmlFiles[fileNext].file.length)) {// 次のファイルがモバイルかを判別する
							fileEquip = { type:'dm', device:'desktop', icon:deviceIcons[1], file:fileCurrentId };
						} else {// dt確定
							fileEquip = { type:'dt', device:'desktop', icon:deviceIcons[1], file:fileCurrentId };
						}
					}
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[i].file.length)&&(suffixMobile.length<=containerHtmlFiles[i].file.length)) {// 自分がMobileかチェック
					// Mobile確定ゾーン===================================================================================================================
					if (containerHtmlFiles[filePrev] !== undefined){// 前のファイルが存在する場合
						var filePrevId = containerHtmlFiles[filePrev].file.replace(new RegExp(suffixDesktop,"g"), "").replace(new RegExp(suffixTablet,"g"), "").replace(new RegExp(suffixMobile,"g"), "");
						if (fileCurrentId === filePrevId) {// 現在のファイル名が前と同じ、[Desktop & Mobile]
							if (fileCurrentId === fileNextId) {// [Desktop & Mobile & Tablet]
								fileEquip = { type:'all', device:'mobile', icon:deviceIcons[2], file:fileCurrentId };
							} else {// [Desktop & Mobile]
								fileEquip = { type:'dm', device:'mobile', icon:deviceIcons[2], file:fileCurrentId };
							}
						} else {// 現在のファイル名が前と不一致
							if (fileCurrentId === fileNextId) {// 現在のファイル名が次と同じ、[Mobile & Tablet]
								fileEquip = { type:'mt', device:'mobile', icon:deviceIcons[2], file:fileCurrentId };
							}
						}
					} else {// 前のファイルはなく、次にファイルが存在する場合
						if (fileCurrentId === fileNextId) {// 現在のファイル名が次と同じ、[Mobile & Tablet]
							fileEquip = { type:'mt', device:'mobile', icon:deviceIcons[2], file:fileCurrentId };
						}
					}
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixTablet)+suffixTablet.length===containerHtmlFiles[i].file.length)&&(suffixTablet.length<=containerHtmlFiles[i].file.length)) {// 自分がTabletかチェック
					fileEquip = { type:'all', device:'tablet', icon:deviceIcons[3], file:fileCurrentId };//TabletのTypeはOnly以外ならいい
				}
			}
			// 自分がどのデバイスか判定する。デバイス兄弟がいない者が辿り着く場所。
			function fileTypeCheckSingle() {
				if ((containerHtmlFiles[i].file.lastIndexOf(suffixDesktop)+suffixDesktop.length===containerHtmlFiles[i].file.length)&&(suffixDesktop.length<=containerHtmlFiles[i].file.length)) {// 自分がDesktopかチェック[Desktop Only]
					fileEquip = { type:'only', device:'desktop', icon:deviceIcons[1], file:fileCurrentId };
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixMobile)+suffixMobile.length===containerHtmlFiles[i].file.length)&&(suffixMobile.length<=containerHtmlFiles[i].file.length)) {// 自分がMobileかチェック[Mobile Only]
					fileEquip = { type:'only', device:'mobile', icon:deviceIcons[2], file:fileCurrentId };
				} else if ((containerHtmlFiles[i].file.lastIndexOf(suffixTablet)+suffixTablet.length===containerHtmlFiles[i].file.length)&&(suffixTablet.length<=containerHtmlFiles[i].file.length)) {// 自分がTabletかチェック[Tablet Only]
					fileEquip = { type:'only', device:'tablet', icon:deviceIcons[3], file:fileCurrentId };
				}
			}
		}
		// 再利用できるHTML
		var listGroupItem = '<div class=\"d-flex justify-content-between list-group-item overflow-hidden p-0 ' + colorMode.borderColor + '\">';
		var col8Class = 'col-8 d-md-flex justify-content-between align-items-center p-3 overflow-hidden text-decoration-none ';
		var col2Class = 'col-2 border-left d-flex justify-content-center justify-content-md-start align-items-center p-3 overflow-hidden text-decoration-none ';
		//
		function fileOutput() {
			// 再利用できるHTML
			var blankMobile = '<div class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + ' pointer-events-none\"><i class=\"material-icons mr-md-3 muted-color\">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline muted-color">Mobile</p></div>';
			var blankTablet = '<div class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + ' pointer-events-none\"><i class=\"material-icons mr-md-3 muted-color\">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline muted-color">Tablet</p></div>';
			var blankDesktop = '<div class=\"' + col8Class + colorMode.buttonClass + 'pointer-events-none\"><div class=\"d-flex align-items-center w-md-100 row\"><div class=\"col-9 mb-0\">';
			if (IconsAdaptive[iconFileCount] !== undefined) { blankDesktop += '<i class=\"material-icons mr-3 display-4 d-none d-md-inline\">' + IconsAdaptive[iconFileCount] + '</i>'; }
			blankDesktop += '<p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div><div class=\"d-flex align-items-center justify-content-center justify-content-md-start col-3\"><i class="material-icons mr-md-3 muted-color">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline muted-color">Desktop</p></div></div></div>';

			if (fileEquip.type === 'all') {// All だれも空を出力しない
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col8Class + colorMode.borderColor + colorMode.buttonClass + '\"><div class=\"d-flex align-items-center w-md-100 row\"><div class=\"col-9 mb-0 d-flex align-items-center\">';
					if (IconsAdaptive[iconFileCount] !== undefined) { htmlContents += '<i class=\"material-icons mr-3 display-4 d-none d-md-inline\">' + IconsAdaptive[iconFileCount] + '</i>'; }
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class=\"d-flex align-items-center justify-content-center justify-content-md-start col-3\"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>';
				} else if (fileEquip.device === 'mobile') {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>';
				} else if (fileEquip.device === 'tablet') {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			} else if (fileEquip.type === 'dm') {// Desktop & Mobile モバイルがタブレットの空を出力する
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col8Class + colorMode.borderColor + colorMode.buttonClass + '\"><div class=\"d-flex align-items-center w-md-100 row\"><div class=\"col-9 mb-0 d-flex align-items-center\">';
					if (IconsAdaptive[iconFileCount] !== undefined) { htmlContents += '<i class=\"material-icons mr-3 display-4 d-none d-md-inline\">' + IconsAdaptive[iconFileCount] + '</i>'; }
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class=\"d-flex align-items-center justify-content-center justify-content-md-start col-3\"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>';
				} else if (fileEquip.device === 'mobile') {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>' + blankTablet + '</div>';
				}
			} else if (fileEquip.type === 'dt') {// Desktop & Tablet デスクトップがモバイルの空を出力する
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col8Class + colorMode.borderColor + colorMode.buttonClass + '\"><div class=\"d-flex align-items-center w-md-100 row\"><div class=\"col-9 mb-0 d-flex align-items-center\">';
					if (IconsAdaptive[iconFileCount] !== undefined) { htmlContents += '<i class=\"material-icons mr-3 display-4 d-none d-md-inline\">' + IconsAdaptive[iconFileCount] + '</i>'; }
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class=\"d-flex align-items-center justify-content-center justify-content-md-start col-3\"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>' + blankMobile;
				} else if (fileEquip.device === 'tablet') {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			} else if (fileEquip.type === 'mt') {// Mobile & Tablet モバイルがデスクトップの空を出力する
				if (fileEquip.device === 'mobile') {
					htmlContents += listGroupItem + blankDesktop + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>';
				} else if (fileEquip.device === 'tablet') {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			} else if (fileEquip.type === 'only') {// ONLY それぞれが２つ空を出力する
				if (fileEquip.device === 'desktop') {
					htmlContents += listGroupItem + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col8Class + colorMode.borderColor + colorMode.buttonClass + '\"><div class=\"d-flex align-items-center w-md-100 row\"><div class=\"col-9 mb-0 d-flex align-items-center\">';
					if (IconsAdaptive[iconFileCount] !== undefined) { htmlContents += '<i class=\"material-icons mr-3 display-4 d-none d-md-inline\">' + IconsAdaptive[iconFileCount] + '</i>'; }
					htmlContents += '<div><p class="mb-0">' + containerHtmlFiles[i].title + '</p><small class="muted-color d-none d-md-inline">' + fileEquip.file + '</small></div></div><div class=\"d-flex align-items-center justify-content-center justify-content-md-start col-3\"><i class="material-icons mr-md-3">' + deviceIcons[1] + '</i><p class="mb-0 d-none d-md-inline">Desktop</p></div></div></a>' + blankMobile + blankTablet + '</div>';
				} else if (fileEquip.device === 'mobile') {
					htmlContents += listGroupItem + blankDesktop + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[2] + '</i><p class="mb-0 d-none d-md-inline">Mobile</p></a>' + blankTablet + '</div>';
				} else if (fileEquip.device === 'tablet') {
					htmlContents += listGroupItem + blankDesktop + blankMobile + '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"' + col2Class + colorMode.borderColor + colorMode.buttonClass + '\"><i class=\"material-icons mr-md-3\">' + deviceIcons[3] + '</i><p class="mb-0 d-none d-md-inline">Tablet</p></a></div>';
				}
			}
		}

		// ====================================================================================
		// Adaptive
		// ====================================================================================
		if (config.construction == 'adaptive') {

			htmlContents += '<div class=\"list-group\">';

			for (i in containerHtmlFiles) {
				if (!containerHtmlFiles[i].file.indexOf(prefixDev)) {// prefix is dev
					fileSort();
					fileOutput();
				}
				iconFileCount++;
			}
			htmlContents += ['</div></div></div><div class=\"row mb-5\"><div class=\"col-sm-12\"><div class=\"d-flex align-items-center mb-3\"><i class=\"material-icons mr-1\">' + PageTitleIcon + '</i><h2 class=\"mb-0\">' + PageTitle + '</h2></div><div class=\"list-group\">'].join('');
			for (i in containerHtmlFiles) {
				if (!containerHtmlFiles[i].file.indexOf(prefixPage)) {// prefix is page
					fileSort();
					fileOutput();
				}
			}
			htmlContents += ['</div></div></div><div class=\"row mb-5\"><div class=\"col-sm-12\"><div class=\"d-flex align-items-center mb-3\"><i class=\"material-icons mr-1\">' + WorkTitleIcon + '</i><h2 class=\"mb-0\">' + WorkTitle + '</h2></div><div class=\"list-group\">'].join('');
			for (i in containerHtmlFiles) {
				if (!containerHtmlFiles[i].file.indexOf(prefixWork)) {// prefix is work
					fileSort();
					fileOutput();
				}
			}
		}

		// ====================================================================================
		// Responsive
		// ====================================================================================
		if (config.construction == 'responsive') {
			htmlContents += '<div class=\"row mb-5\">';
			var iconFileCount = 0;
			for (var i in containerHtmlFiles) {
				if (!containerHtmlFiles[i].file.indexOf(prefixDev)) {
					htmlContents += '<div class=\"col-md-3 mt-2 mb-2\"><a href=\"' + containerHtmlFiles[i].file + '\" class=\"h-100 btn btn-block list-group-item text-center pt-4 pb-4 pl-2 pr-2 ' + colorMode.borderColor + ' overflow-hidden ' + colorMode.buttonClass + '\"><div class=\"mb-1\">\n';
					if (IconsResponsive[iconFileCount] !== undefined) {
						htmlContents += '<i class=\"material-icons display-4\">' + IconsResponsive[iconFileCount] + '</i>';
					}
					htmlContents += '</div><h2 class=\"mb-0\">' + containerHtmlFiles[i].title + '</h2><div><small class="muted-color">' + containerHtmlFiles[i].file + '</small></div></a></div>\n';
					iconFileCount++;
				}
			}
			htmlContents += [
				'</div>',
				'<div class=\"row mb-5\">',
					'<div class=\"col-sm-12\">',
						'<div class=\"d-flex align-items-center mb-3\"><i class=\"material-icons mr-1\">description</i><h2 class=\"mb-0\">Pages</h2></div>',
						'<div class=\"list-group\">\n'
			].join('');
			for (var i in containerHtmlFiles) {
				if (!containerHtmlFiles[i].file.indexOf(prefixPage)) {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"list-group-item list-group-item-action d-md-flex justify-content-between align-items-center ' + colorMode.borderColor + ' overflow-hidden ' + colorMode.buttonClass + '\">' + containerHtmlFiles[i].title + '<div> <small class="muted-color">' + containerHtmlFiles[i].file + '</small></div></a>\n';
				}
			}
			htmlContents += [
				'</div></div></div>',
				'<div class=\"row mb-5\">',
					'<div class=\"col-sm-12\">',
					'<div class=\"d-flex align-items-center mb-3\"><i class=\"material-icons mr-1\">create</i><h2 class=\"mb-0\">Workspace</h2></div>',
						'<div class=\"list-group\">\n'
			].join('');
			for (var i in containerHtmlFiles) {
				if (!containerHtmlFiles[i].file.indexOf(prefixWork)) {
					htmlContents += '<a href=\"' + containerHtmlFiles[i].file + '\" class=\"list-group-item list-group-item-action d-md-flex justify-content-between align-items-center ' + colorMode.borderColor + ' overflow-hidden ' + colorMode.buttonClass + '\">' + containerHtmlFiles[i].title + '<div> <small class="muted-color">' + containerHtmlFiles[i].file + '</small></div></a>\n';
				}
			}
		}

		// これより下はResponsiveとAdaptive共通
		htmlContents += '</div></div></div><div class=\"row\"><div class=\"col-sm-12\"><dl><dt>' + disclaimer + '</dt><dd>' + disclaimerTxt + '</dd></dl><hr class=\"' + colorMode.borderColor + '\"><p class=\"muted-color text-center\"><small>' + copyright + '</small></p></div></div></div></body></html>';

		fs.writeFile(outputdir + outputname, htmlContents, function (err) {
			if (err) throw err;
		});
	});
}

exports.makeIndex = makeIndex;
