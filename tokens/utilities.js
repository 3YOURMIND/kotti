export const arrayToCustomProperties = (colors, type = 'reference') => {
	return colors.reduce((acc, current) => {
		const valueRepr =
			type === 'reference' ? `var(--${current.reference})` : current.value
		acc += `--${current.name}: ${valueRepr};
`
		return acc
	}, '')
}

export const tokenObjectToColorObject = tokens => {
	return tokens.map(({ name, reference }) => {
		return { name, value: reference }
	})
}

export const objectToArray = colors => {
	const output = []
	for (let key in colors) {
		output.push({ name: key, value: colors[key] })
	}
	return output
}

export const arrayToObject = colors => {
	const output = {}
	colors.forEach(color => {
		output[color.name] = color.value || color.reference
	})
	return output
}
