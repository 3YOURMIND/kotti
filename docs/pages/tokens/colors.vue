<template lang="md">
# Color Tokens

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

</template>

<script>
import { baseColorsFactory, tokenColorsFactory } from '../../../tokens'

export default {
	name: 'NewColors',
	data() {
		return {
			baseColorsFactory,
			tokenColorsFactory,
			columns: [
				{ label: 'Name', prop: 'name' },
				{ label: 'Description', prop: 'description' },
				{ label: 'Refers to', prop: 'reference' },
				{ label: '', prop: 'reference' },
			],
		}
	},
	methods: {
		renderColor(h, { row }) {
			const color = baseColorsFactory.object[row.reference]
			if (!color) return 'No color'
			return (
				<div class="color-box" style={`--localColor: ${color};`}>
					&nbsp;
				</div>
			)
		},
		renderColorVar(h, { value }) {
			return <code>--{value}</code>
		},
	},
}
</script>

<style>
.color-box {
	width: 50px;
	height: 50px;
	margin: 8px;
	background: var(--localColor);
	border: 4px solid #fff;
	border-radius: 50%;
	box-shadow: 2px 2px 5px #ccc;
}
</style>
