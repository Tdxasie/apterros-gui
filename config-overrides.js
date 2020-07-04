const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {addWebpackExternals, override, addLessLoader } = require('customize-cra');

module.exports = override(
	addWebpackExternals([nodeExternals()]),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: path.join(__dirname, './src/theme/vars.less'),
	}),
);