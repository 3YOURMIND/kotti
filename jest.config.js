module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts', 'vue', 'tsx', 'jsx'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRegex: 'tests.ts',
	transform: {
		'.*\\.(vue)$': 'vue-jest',
		'^.+\\.tsx?$': 'ts-jest',
	},
}
