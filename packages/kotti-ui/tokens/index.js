import Color from 'color'

import { tokens, baseColors } from './colors.js'
import {
	objectToArray,
	arrayToCustomProperties,
	arrayToObject,
} from './utilities.js'

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
	splitDashIntoGroups = false,
) => {
	const output = []
	tokenColorsFactory.array.forEach((token) => {
		let name = token.name.split('--').join('')
		if (splitDashIntoGroups) {
			name = name.split('-').join(' / ')
		}
		const referencedColor = token.reference
			? baseColorsFactory.object[token.reference]
			: token.value
		const color = Color(referencedColor).rgb().object()
		const description = token.description
			? `${token.description}.
Original color: '${token.reference}'`
			: ''
		output.push({
			name,
			description,
			color,
		})
	})
	return output
}

export const figma = factoryToFigmaImportable(
	tokenColorsFactory,
	baseColorsFactory,
)
