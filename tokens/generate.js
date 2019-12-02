import { tokens, baseColors } from './colors'
import { arrayToCustomProperties, objectToArray } from './utilities'
import fs from 'fs'

// get CSS
let output = `
/*
// This file is auto generated
// PLEASE DO NOT EDIT
// Run \`yarn tokens\` to egenrate again
*/

:root{
${arrayToCustomProperties(objectToArray(baseColors), 'color')}
${arrayToCustomProperties(tokens)}
}`

// Write it
fs.writeFile('./packages/kotti-style/tokens.css', output, err => {
	err ? console.log(err) : console.log('File written')
})
