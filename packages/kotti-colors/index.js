import { tokens, baseColors } from './colors'
import {
	objectToArray,
	arrayToCustomProperties,
	arrayToObject,
} from './utilities'

export const baseColorsFactory = {
	object: baseColors,
	array: objectToArray(baseColors),
	string: arrayToCustomProperties(objectToArray(baseColors), 'color'),
}

export const tokenColorsFactory = {
	object: arrayToObject(tokens),
	array: tokens,
	string: arrayToCustomProperties(tokens),
}

export const customProperties = `
${baseColorsFactory.string}


${tokenColorsFactory.string}`

export const factoryToFigmaImportable = (
	tokenColorsFactory,
	baseColorsFactory,
) => {
	const output = []
	tokenColorsFactory.array.forEach(token => {
		const name = token.name.split('-').join(' ')
		output.push({
			name,
			description: token.description,
			color: baseColorsFactory.object[token.reference],
		})
	})
	return output
}

export const figma = factoryToFigmaImportable(
	tokenColorsFactory,
	baseColorsFactory,
)
