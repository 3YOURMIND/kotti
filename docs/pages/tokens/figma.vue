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

**It should not be used in a production file, it is just for cleaning up tests, 
if you use it on the library file, you will break every team projects!**

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
import {
	baseColorsFactory,
	figma,
	tokenColorsFactory,
	factoryToFigmaImportable,
} from '../../../tokens'
import figmaImportScript from '../../../tokens/figma-import-script'

export default {
	name: 'NewColors',
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
</script>
