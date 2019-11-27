import { tokens, baseColors } from './colors'
import {
	objectToArray,
	arrayToCustomProperties,
	arrayToObject,
} from './utilities'
import Color from 'color'

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
		const name = token.name.split('--').join('')
		const referencedColor = token.reference
			? baseColorsFactory.object[token.reference]
			: token.value
		const color = Color(referencedColor)
			.rgb()
			.object()
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

// tokens.forEach(token => {
// 	// edit the style if already existing
// 	const existingStyles = figma.getLocalPaintStyles()
// 	let existing = existingStyles.find(style => style.name === token.name)
// 	let figmaStyle
// 	if (existing) {
// 		figmaStyle = existing
// 	}else{
// 		figmaStyle = figma.createPaintStyle()
// 	}

// 	figmaStyle.name = token.name
// 	figmaStyle.description = token.description

// 	figmaStyle.paints = [
// 		{
// 			type: 'SOLID',
// 			color: {
// 				r: token.color.r / 255,
// 				g: token.color.g / 255,
// 				b: token.color.b / 255,
// 			},
// 		},
// 	]
// })

export const figma = factoryToFigmaImportable(
	tokenColorsFactory,
	baseColorsFactory,
)
