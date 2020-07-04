const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
	stylesDir: path.join(__dirname, './src/theme'),
	antDir: path.join(__dirname, './node_modules/antd'),
	varFile: path.join(__dirname, './src/theme/vars.less'),
	mainLessfile: path.join(__dirname, './src/theme/index.less'),
	themeVariables: ['@body-background', '@primary-color'],
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