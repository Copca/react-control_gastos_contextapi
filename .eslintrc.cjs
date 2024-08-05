module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		// 'no-unused-vars': 'off',
		// '@typescript-eslint/no-unused-vars': 'error',
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

		'no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'after-used',
				caughtErrors: 'all',
				ignoreRestSiblings: false,
				reportUsedIgnorePattern: false
			}
		]
	}
};
/* eslint-disable @typescript-eslint/no-unused-vars */
