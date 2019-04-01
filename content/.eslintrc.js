module.exports = {
	root: true,
	parserOptions: {
		parser: "babel-eslint",
		sourceType: "module"
	},
	"extends": [
		"airbnb",
		"plugin:vue/recommended"
	],
	plugins: [
		'vue'
	],
	'rules': {
		'arrow-parens': 0,
		'generator-star-spacing': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
		'comma-dangle': ['error', 'never'],
		'no-shadow': 0,
		'no-param-reassign': ["error", { "props": true, "ignorePropertyModificationsFor": ["state"] }],
		'object-curly-newline': ["error", { "consistent": true }],
		'unicode-bom': 0,
		'import/no-unresolved': 0,
		'vue/script-indent': ['error', "tab", { 'baseIndent': 0 }],
		'vue/html-indent': ['error', "tab", { 'baseIndent': 1 }],
		'no-tabs': 0,
		"indent": ["error", "tab"],
		"no-mixed-operators": 0,
		"import/prefer-default-export": 0,
		"no-use-before-define": 0,
		"no-plusplus": 0
	}
};
