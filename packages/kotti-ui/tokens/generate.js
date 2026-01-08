import fs from 'fs'

import { darkModeTokens, tokens, baseColors } from './colors.js'
import { arrayToCustomProperties, objectToArray } from './utilities.js'

// get CSS
const output = `
/*
	This file is auto-generated
	PLEASE DO NOT EDIT
	Run \`yarn workspace @3yourmind/kotti-ui run build:tokens\` to regenerate it
*/

:root {
${arrayToCustomProperties(objectToArray(baseColors), 'color')}
${arrayToCustomProperties(tokens)}
}

@media (prefers-color-scheme: dark) {
	:root:not([data-theme="light"]) {
	${arrayToCustomProperties(darkModeTokens)}
	}
}
`

// Write it
fs.writeFile('./source/kotti-style/tokens.css', output, (err) => {
	// eslint-disable-next-line no-console
	err ? console.log(err) : console.log('File written')
})
