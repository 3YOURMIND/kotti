<template lang="md">
# Color Tokens

## Migration

Old scss variables will still be available but we will drop support in the next major release. <br>
We encourage you to replace usage of kotti colors with kotti color tokens.

## List of tokens

This list is automatically generated so you can consider it a source of truth.

<KtTableLegacy :rows="tokenColorsFactory.array" class="colorize">
  <KtTableLegacyColumn label="Name" :renderCell="renderColorVar" prop="name"/>
  <KtTableLegacyColumn label="Refers to" :renderCell="renderColorVar" prop="reference"/>
  <KtTableLegacyColumn label="Color" prop="" :renderCell="renderColor"/>
  <KtTableLegacyColumn label="Description" prop="description"/>
</KtTableLegacy>

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
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
	baseColorsFactory,
	tokenColorsFactory,
} from '@3yourmind/kotti-ui/tokens'

export default {
	name: 'DocumenationPageFoundationsColorsTokens',
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
			return h(
				'div',
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				{ class: 'color-box', style: `--local-color: ${color}` },
			)
		},
		renderColorVar(h, { value }) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			return h('code', null, `--${value}`)
		},
	},
}
</script>

<style lang="scss" scoped>
.colorize ::v-deep .color-box {
	width: 50px;
	height: 50px;
	margin: 8px;
	background: var(--local-color);
	border: 4px solid #fff;
	border-radius: 50%;
	box-shadow: 2px 2px 5px #ccc;
}
</style>
