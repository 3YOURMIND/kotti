<template lang="md">
# Figma

We are using figma for proptotyping and managing our components.
Our goal is to keep everything updated between the code and the figma files.

We wrote few scripts that uses the figma API to avoid us any manual work.

## Import into figma

Figma let you use the `figma` object in the console, so we can easily interact with
the API without even having to create or publish plugins. We'll use that feature to
easily import the colors into figma as styles.

### Clean up old color styles

This snippet will help you delete every color style (paint style, also include gradients
and patterns) on a project.

<strong style="color: var(--red-70)">It should not be used in a production file, it is just for cleaning up tests,
if you use it on the library file, you will break every team projects!</strong>

<pre class="long">
// remove all style from pages
existingStyles = figma.getLocalPaintStyles()
existingStyles.forEach(style=> style.remove())
</pre>

### Color list

This is useful if you use the color importer figma plugin (TBA).

#### Base colors

<pre class="long">
{{baseImportableList}}
</pre>

#### Tokens

<pre class="long">
{{tokenImportableList}}
</pre>

### The script

This can be copy and pasted directly into the console and will import your colors.
It will also edit existant colors if they exists already. Name will be used to
check existence.

#### Base colors only

<pre class="long">
tokens = {{baseImportableList}}

{{figmaImportScript}}
</pre>

#### Tokens only

<pre class="long">
tokens = {{tokenImportableList}}

{{figmaImportScript}}
</pre>

#### Base colors and tokens

<pre class="long">
tokens = {{[...baseImportableList,...tokenImportableList]}}

{{figmaImportScript}}
</pre>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
	baseColorsFactory,
	factoryToFigmaImportable,
	figma,
	tokenColorsFactory,
} from '@3yourmind/kotti-ui/tokens'

const figmaImportScript = `tokens.forEach(token => {
	// edit the style if already existing
	const existingStyles = figma.getLocalPaintStyles()
	let existing = existingStyles.find(style => style.name === token.name)
	let figmaStyle
	if (existing) {
		figmaStyle = existing
	} else {
		figmaStyle = figma.createPaintStyle()
	}

	figmaStyle.name = token.name
	figmaStyle.description = token.description

	figmaStyle.paints = [
		{
			type: 'SOLID',
			color: {
				r: token.color.r / 255,
				g: token.color.g / 255,
				b: token.color.b / 255,
			},
		},
	]
})`

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'DocumenationPageFoundationsColorsFigma',
	data() {
		return {
			baseColorsFactory,
			figma,
			tokenColorsFactory,
			figmaImportScript,
		}
	},
	computed: {
		tokenImportableList() {
			return factoryToFigmaImportable(
				tokenColorsFactory,
				baseColorsFactory,
				true,
			)
		},
		baseImportableList() {
			return factoryToFigmaImportable(
				baseColorsFactory,
				baseColorsFactory,
				true,
			)
		},
	},
}
/* eslint-enable perfectionist/sort-objects */
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
</script>
