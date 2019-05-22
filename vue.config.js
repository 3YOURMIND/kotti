module.exports = {
	productionSourceMap: false,
	css: {
		loaderOptions: {
			scss: {
				data: `
          @import "./packages/kotti-style/_variables.scss";
          @import "./packages/kotti-style/mixins/index.scss";
        `,
			},
		},
	},
}
