/**
 * Simple low-effort hashsum
 */
export const simpleHash = (strings: string[]): string => {
	const maximumLength = strings.reduce(
		(acc, next) => Math.max(acc, next.length),
		0,
	)

	const result = new window.Uint8Array(maximumLength)

	for (const string of [...strings].sort()) {
		for (let charIndex = 0; charIndex < string.length; charIndex++) {
			// string.length is added to make collisions less likely (e.g. foo + fooBar = baz + bazBar without this)
			result[charIndex] ^= string.charCodeAt(charIndex) + string.length
		}
	}

	const simpleHashedValue = window.btoa(String.fromCharCode(...result))

	return `${String(strings.length)}${simpleHashedValue}`
}
