/**
 * We don't need the full package, as we don’t consider strings to be valid numbers
 * @see {@link https://github.com/jonschlinkert/is-number/blob/98e8ff1da1a89f93d1397a24d7413ed15421c139/index.js#L11-L13}
 */
export const isNumber = (value: unknown): value is number =>
	// eslint-disable-next-line sonarjs/no-identical-expressions
	typeof value === 'number' ? value - value === 0 : false
