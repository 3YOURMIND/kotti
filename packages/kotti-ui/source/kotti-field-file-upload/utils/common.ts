/**
 * Builds a valid string for the HTML file input's accept attribute
 * @param extensions Array of allowed file extensions
 * @returns Accept string, e.g.: ".jpg,.jpeg,.jp2,.png"
 */
export const buildAcceptString = (
	extensions: Array<string>,
): HTMLInputElement['accept'] | undefined =>
	extensions.length
		? extensions
				.map((extension) => `.${extension.replace(/\./g, '').trim()}`)
				.join(',')
				.toLowerCase()
		: undefined
