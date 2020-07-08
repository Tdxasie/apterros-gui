const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
	stylesDir: path.join(__dirname, './src/theme'),
	antDir: path.join(__dirname, './node_modules/antd'),
	varFile: path.join(__dirname, './src/theme/vars.less'),
	mainLessfile: path.join(__dirname, './src/theme/index.less'),
	themeVariables: [
		'@primary-color',
		'@body-background', 
		'@popover-background',
		'@popover-customize-border-color',
		'@component-background',
		'@text-color',
		'@text-color-secondary',
		'@text-color-inverse',
		'@icon-color-hover',
		'@heading-color',
		'@item-active-bg',
		'@item-hover-bg',
		'@border-color-base',
		'@border-color-split',
		'@background-color-light',
		'@background-color-base'
	],
	indexFileName: 'index.html',
	outputFilePath: path.join(__dirname, './public/color.less'),
};

generateTheme(options)
	.then(() => {
		console.log('Theme generated succesfully');
	})
	.catch((err) => {
		console.log('Error', err);
	});