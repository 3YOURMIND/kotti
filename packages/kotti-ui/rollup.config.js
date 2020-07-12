import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";

export default [
	{
		input: "source/index.ts",
		output: {
			format: "esm",
			sourcemap: true,
			file: "dist/index.esm.js"
		},
		external: ["vue", "@vue/composition-api"],
		plugins: [
			typescript({
				tsconfig: "tsconfig.json",
				useTsconfigDeclarationDir: true,
				experimentalDecorators: true,
				module: "esnext"
			}),
			vue({ needMap: false })
		]
	}
	// {
	// 	input: "source/index.ts",
	// 	output: {
	// 		format: "cjs",
	// 		file: "dist/index.cjs.js"
	// 	},
	// 	external: ["vue", "@vue/composition-api"],
	// 	plugins: [
	// 		typescript({
	// 			tsconfig: "tsconfig.json",
	// 			useTsconfigDeclarationDir: true,
	// 			experimentalDecorators: true,
	// 			module: "es2015"
	// 		}),
	// 		vue()
	// 	]
	// }
];
