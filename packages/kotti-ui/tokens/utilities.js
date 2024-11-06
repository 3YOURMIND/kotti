export const arrayToCustomProperties = (colors, type = 'reference') =>
	colors
		.map(
			(color) =>
				`\t--${color.name}: ${
					type === 'reference' ? `var(--${color.reference})` : color.value
				};`,
		)
		.join('\n')

export const objectToArray = (colors) =>
	Object.entries(colors).map(([name, value]) => ({ name, value }))

export const arrayToObject = (colors) =>
	Object.fromEntries(
		colors.map((color) => [color.name, color.value || color.reference]),
	)
