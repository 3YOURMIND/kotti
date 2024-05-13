import globals from 'globals'

/**
 * List of allowed global variables.
 *
 * This list should be kept as short as possible, and only include:
 *
 * 1) well-known properties & APIs (e.g. Array, Math)
 * 2) names of global types (e.g. FileList)
 * 3) error classes (e.g. RangeError)
 *
 * This was introduced to catch mistakes like implicitly using `escape` instead of `lodash.escape` when moving code.
 */
const GLOBALS_WHITELIST = new Set([
	'Array',
	'Blob',
	'Boolean',
	'CanvasRenderingContext2D', // complicated due to typescript types
	'console',
	'document',
	'Date',
	'Element',
	'Error',
	'fetch',
	'File', // complicated due to typescript types
	'FileList', // complicated due to typescript types
	'FileReader', // complicated due to typescript types
	'FormData',
	'Function',
	'Intl',
	'JSON',
	'Map',
	'Math',
	'MediaDeviceInfo', // complicated due to typescript types
	'MediaStream', // complicated due to typescript types
	'Number',
	'Object',
	'performance',
	'Promise',
	'RangeError',
	'ReferenceError',
	'RegExp',
	'Set',
	'String',
	'Symbol',
	'SyntaxError',
	'TypeError',
	'undefined',
	'WeakMap',
	'WeakSet',
	'window',
	'Window',
])

const GLOBALS_LIST = new Set(
	[globals.browser, globals.builtin, globals.es2015].flatMap(Object.keys),
)

const GLOBALS_FORBIDDEN = (() => {
	const result = new Set<string>()

	for (const item of GLOBALS_LIST)
		if (
			!GLOBALS_WHITELIST.has(item) &&
			!item.startsWith('HTML') &&
			!item.includes('Event')
		)
			result.add(item)

	return result
})()

export const noRestrictedGlobalsConfig = Array.from(GLOBALS_FORBIDDEN).map(
	(globalVariable) => ({
		name: globalVariable,
		message: `Do not directly access global variables. Use window.${globalVariable} instead.`,
	}),
)
