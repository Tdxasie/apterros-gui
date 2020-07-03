module.exports = {
	'root': true,
	'env': {
		'node': true,
		'es6': true,
		'browser': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parser': 'babel-eslint',
	'parserOptions': {
		'sourceType': 'module',
		'ecmaVersion': '2018'
    },
    'plugins':[
        'react-hooks'
    ],
	'rules': {
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
		'indent': [
			'warn',
			'tab',
			{ 'SwitchCase': 1 }
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-var': [
			'error'
		],
		'no-console': [
			'off'
		],
		'no-undef': [
			'warn'
		],
		'no-unused-vars': [
			'warn'
		],
		'no-mixed-spaces-and-tabs': [
			'warn'
		],
		'react/prop-types': [
			'off'
		],
		'react/no-deprecated': [
			'warn'
		]
	}
};
