module.exports = (api) => {
	api.cache(false)
	return {
		presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-typescript'],
		plugins: [
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'@babel/plugin-proposal-optional-chaining',
		],
	}
}
