import fs from 'fs'

import { tokens, baseColors } from './colors'
import { arrayToCustomProperties, objectToArray } from './utilities'

// get CSS
const output = `
/*
	This file is auto generated
	PLEASE DO NOT EDIT
	Run \`yarn tokens\` to generate again
*/

:root{
	${arrayToCustomProperties(objectToArray(baseColors), 'color')}
	${arrayToCustomProperties(tokens)}
}`

// Write it
fs.writeFile('./packages/kotti-style/tokens.css', output, (err) => {
	// eslint-disable-next-line no-console
	err ? console.log(err) : console.log('File written')
})
