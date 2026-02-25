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
	<p>
		Token naming is based on light mode appearance. In dark mode, these names
		lose their literal meaning as color values are inverted.
	</p>

	<KtTable class="colorize" tableId="COLOR_TABLE" />

	<h2>CSS custom properties generated</h2>

	<p>This list is automatically generated and thus always up-to-date.</p>

	<CodePreview :code="cssTokens" language="css" />
</template>

<script lang="ts">
import { computed, defineComponent, h } from 'vue'

import {
	createColumnContext,
	getCustomDisplay,
	isDarkMode,
	KtTable,
	useKottiTable,
} from '@3yourmind/kotti-ui'
import {
	baseColorsFactory,
	darkModeTokenColorsFactory,
	tokenColorsFactory,
} from '@3yourmind/kotti-ui/tokens'

import CodePreview from '~/components/CodePreview.vue'

type TableRow = (typeof tokenColorsFactory.array)[number] &
	Record<string, unknown>

const displayCode = getCustomDisplay<string>({
	align: 'left',
	disableCellClick: false,
	isNumeric: false,
	render: (val) => {
		return h('code', null, val)
	},
	sortBehavior: 'asc-desc',
})

export default defineComponent({
	name: 'DocumenationPageFoundationsColorsTokens',
	components: {
		CodePreview,
		KtTable,
	},
	setup() {
		const { createColumn } = createColumnContext<TableRow>()
		useKottiTable(
			computed(() => ({
				columns: [
					createColumn({
						display: displayCode,
						getData: (row) => `--${row.name}`,
						id: 'name',
						label: 'Name',
					}),
					createColumn({
						display: displayCode,
						getData: (row) => `--${row.reference}`,
						id: 'reference',
						label: 'Refers to',
					}),
					createColumn({
						display: getCustomDisplay<TableRow>({
							align: 'center',
							disableCellClick: false,
							isNumeric: false,
							render: (row) => {
								const color = (
									baseColorsFactory.object as Record<string, string>
								)[row.reference]
								if (!color) return 'No color'
								return h('div', {
									class: 'color-box',
									style: `--local-color: ${color}`,
								})
							},
							sortBehavior: 'asc-desc',
						}),
						getData: (row) => row,
						id: 'colorDisplay',
						label: '',
					}),
					createColumn({
						display: displayCode,
						getData: (row) => row.description,
						id: 'description',
						label: 'Description',
					}),
				],
				data: isDarkMode.value
					? darkModeTokenColorsFactory.array
					: tokenColorsFactory.array,
				getRowBehavior: ({ row }: { row: TableRow }) => ({
					id: row.name,
				}),
				id: 'COLOR_TABLE',
			})),
		)

		return {
			baseColorsFactory,
			cssTokens: `
			/* Base colors */

			${baseColorsFactory.string as string}

			/* Token colors */

			${tokenColorsFactory.string as string}
			`,
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
	border: 4px solid var(--icon-03);
	border-radius: 50%;
	box-shadow: 2px 2px 5px var(--text-04);
}
</style>
