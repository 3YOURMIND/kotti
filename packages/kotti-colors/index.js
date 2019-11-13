import { tokens, baseColors } from './colors'

export const objectToCustomProperties = colors => {
	return colors.reduce((acc, current) => {
		acc += `--${current.name}: ${current.value};
`
		return acc
	}, '')
}

export const tokenObjectToColorObject = (colors, tokens) => {
	return tokens.map(({ name, reference }) => {
		let color = { name, value: colors[reference] }
		return color
	})
}

export const colorObjectTokens = tokenObjectToColorObject(baseColors, tokens)
export const customPropertiesTokens = objectToCustomProperties(
	colorObjectTokens,
)
