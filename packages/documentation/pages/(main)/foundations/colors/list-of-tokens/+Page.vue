<template>
	<h1>Color Tokens</h1>

	<h2>Migration</h2>

	<p>
		Old scss variables will still be available but we will drop support in the
		next major release. <br />
		We encourage you to replace usage of kotti colors with kotti color tokens.
	</p>

	<h2>List of tokens</h2>

	<p>This list is automatically generated and thus always up-to-date.</p>

	<strong>TODO: <i>Implement Table</i></strong>

	<!-- <KtTableLegacy :rows="tokenColorsFactory.array" class="colorize">
	<KtTableLegacyColumn label="Name" :renderCell="renderColorVar" prop="name"/>
	<KtTableLegacyColumn label="Refers to" :renderCell="renderColorVar" prop="reference"/>
	<KtTableLegacyColumn label="Color" prop="" :renderCell="renderColor"/>
	<KtTableLegacyColumn label="Description" prop="description"/>
	</KtTableLegacy> -->

	<h2>CSS custom properties generated</h2>

	<p>This list is automatically generated and thus always up-to-date.</p>

	<CodePreview
		code="
			/* Base colors */

			${baseColorsFactory.string}

			/* Token colors */

			${tokenColorsFactory.string}
		"
		language="css"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
	baseColorsFactory,
	tokenColorsFactory,
} from '@3yourmind/kotti-ui/tokens'

import CodePreview from '~/components/CodePreview.vue'

export default defineComponent({
	name: 'DocumenationPageFoundationsColorsTokens',
	components: {
		CodePreview,
	},
	setup() {
		return {
			baseColorsFactory,
			// columns: [
			// 	{ label: 'Name', prop: 'name' },
			// 	{ label: 'Description', prop: 'description' },
			// 	{ label: 'Refers to', prop: 'reference' },
			// 	{ label: '', prop: 'reference' },
			// ],
			// renderColor(h, { row }) {
			// 	const color = baseColorsFactory.object[row.reference]
			// 	if (!color) return 'No color'
			// 	return h(
			// 		'div',
			// 		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			// 		{ class: 'color-box', style: `--local-color: ${color}` },
			// 	)
			// },
			// renderColorVar(h, { value }) {
			// 	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			// 	return h('code', null, `--${value}`)
			// },
			tokenColorsFactory,
		}
	},
})
</script>

<style lang="scss" scoped>
.colorize :deep(.color-box) {
	width: 50px;
	height: 50px;
	margin: 8px;
	background: var(--local-color);
	border: 4px solid #fff;
	border-radius: 50%;
	box-shadow: 2px 2px 5px #ccc;
}
</style>
