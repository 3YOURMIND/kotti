<template lang="md">
  # New Colors

  Our new color system is better, bigger and uses CSS custom properties!
  We are using the `ie11-custom-properties` package for IE11 support.

  ## CSS Custom properties

  CSS custom properties are just native CSS variables. Without any preprocesssing ! 
  Also mean they work in cascade! All of that is great!

``` css
  /* set a css custom property */
  --text-01: #000;
  --background-01: #f5f5f5; 

  /* read a property */
  color: var(--text-01)
  background-color: var(--background-01)
```

## The token principle
Using color names like `gray-10` make sense, but we think that color name should be semantic as well!
So we are abstracting the color by usage. It help really make sense for changing colors as well.

When using kotti color, you should use token colors and not base color directly!

## Migration
Old scss variables will still be available but we will drop support in the next major release. <br>
We encourage you to replace usage of kotti colors with kotti color tokens.

## List of tokens
This list is automatically generated so you can consider it a source of truth.

<KtTable :rows="tokenColorsFactory.array">
  <KtTableColumn label="Name" :renderCell="renderColorVar" prop="name"/>
  <KtTableColumn label="Refers to" :renderCell="renderColorVar" prop="reference"/>
  <KtTableColumn label="Color" prop="" :renderCell="renderColor"/>
  <KtTableColumn label="Description" prop="description"/>
</KtTable>

## CSS custom properties generated

Again, these are automatically generated so it can be considered source of truth.

<pre class="long">
/* Base colors */

{{baseColorsFactory.string}}

/* Token colors */

{{tokenColorsFactory.string}}
</pre>

## Import into figma
Figma let you use the `figma` object in the console, so we can easily interact with 
the API without even having to create or publish plugins. We'll use that feature to 
easily import the colors into figma as styles.

### Clean up old color
This snippet will help you delete every color style (paint style, also include gradients 
and patterns) on a project. 

**It should not be used in a production file, it is just for cleaning up tests, 
if you use it on the library file, you will break every team projects!**

``` js 
// remove all style from pages
const existingStyles = figma.getLocalPaintStyles()
existingStyles.forEach(style=> style.remove())
```

### Color list 

This is useful if you use the color importer figma plugin.

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

### Base colors and tokens
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
} from '../../../packages/kotti-colors/index'
import figmaImportScript from '../../../packages/kotti-colors/figma-import-script'

export default {
	name: 'NewColors',
	data() {
		return {
			baseColorsFactory,
			figma,
			tokenColorsFactory,
			figmaImportScript,
			columns: [
				{ label: 'Name', prop: 'name' },
				{ label: 'Description', prop: 'description' },
				{ label: 'Refers to', prop: 'reference' },
				{ label: '', prop: 'reference' },
			],
		}
	},
	methods: {
		renderColor(h, { value, row, rowIndex, column, columnIndex }) {
			const color = baseColorsFactory.object[row.reference]
			if (!color) return 'No color'
			return (
				<div class="color-box" style={`--localColor: ${color};`}>
					&nbsp;
				</div>
			)
		},
		renderColorVar(h, { value, row, rowIndex, column, columnIndex }) {
			return <code>--{value}</code>
		},
	},
	computed: {
		tokenImportableList() {
			return factoryToFigmaImportable(tokenColorsFactory, baseColorsFactory)
		},
		baseImportableList() {
			return factoryToFigmaImportable(baseColorsFactory, baseColorsFactory)
		},
	},
}
</script>
<style>
.color-box {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	box-shadow: 2px 2px 5px #ccc;
	border: 4px solid #fff;
	background: var(--localColor);
	margin: 8px;
}
pre.long {
	max-height: 500px;
	overflow-y: auto;
}
</style>
