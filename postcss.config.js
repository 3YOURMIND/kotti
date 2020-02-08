module.exports = {
	ident: 'postcss',
	plugins: {
		// to edit target browsers: use "browserslist" field in package.json
		'autoprefixer': {}, // using default, passed by vue. Default reads the browserslist entry in package.json
		'postcss-preset-env': {}, //using default - stage 2
		'postcss-flexbugs-fixes': {},
		'postcss-bem-linter': { preset: 'bem' },
	},
}
