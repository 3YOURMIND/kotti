import { filesize } from 'filesize'

/**
 * Formats an array of strings to a comma-separated string in uppercase
 * @param extensions Array of allowed file extensions
 * @param collapseExtensionsAfter Maximum number of extensions to display
 * @returns Formatted string, e.g.: "JPG, JPEG, JP2, PNG"
 */
export const formatExtensions = (
	extensions: Array<string>,
	collapseExtensionsAfter: number,
): string =>
	[
		...extensions
			.slice(0, collapseExtensionsAfter)
			.map((extension: string) => extension.replace(/\./g, '').trim()),
		...(extensions.length > collapseExtensionsAfter ? ['...'] : []),
	]
		.join(', ')
		.toUpperCase()

/**
 * Formats file size to a human readable file size string from a number
 * @param fileSize File size in bytes
 * @param round Decimal place, default is 1
 * @returns Formatted file size string
 */
export const formatFileSize = (fileSize: number, round = 1): string =>
	filesize(fileSize, { round })
