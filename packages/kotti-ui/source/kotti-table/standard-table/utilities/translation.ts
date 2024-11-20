/**
 * Applies text pluralization
 * @param translation the translated text with pluralization cases separated by `|`
 * @param count the amount of elements
 * @param values a token-value dictionary to replace tokens in the translated text
 * @returns the pluralized text
 */
export const pluralize = (
	translation: string,
	count: number,
	values: Record<string, number | string>,
): string => {
	const cases = translation.split('|')

	if (cases.length === 0) {
		throw new Error('Invalid translation string')
	}

	let result: string = (
		count === 0
			? cases[0]
			: count === 1
				? cases[1] ?? cases[0]
				: cases[2] ?? cases[1] ?? cases[0]
	) as string

	Object.entries(values).forEach(([key, value]) => {
		result = result.replaceAll(`{${key}}`, String(value))
	})

	return result
}
