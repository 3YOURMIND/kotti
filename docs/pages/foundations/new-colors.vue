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

<KtTable :rows="tokens">
  <KtTableColumn label="Name" :renderCell="renderColorVar" prop="name"/>
  <KtTableColumn label="Refers to" :renderCell="renderColorVar" prop="reference"/>
  <KtTableColumn label="Color" prop="" :renderCell="renderColor"/>
  <KtTableColumn label="Description" prop="description"/>
</KtTable>

{{colorObjectTokens}}

<div>
</div>

</template>
<script>
import { baseColors, tokens } from '../../../packages/kotti-colors/colors'
import { colorObjectTokens } from '../../../packages/kotti-colors/index'

export default {
	name: 'NewColors',
	data() {
		return {
			tokens,
			colorObjectTokens,
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
			const color = baseColors[row.reference]
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
</style>
