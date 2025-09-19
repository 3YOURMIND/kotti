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
