<template>
	<div class="kt-table2" :style="style">
		<div
			v-for="column in columns"
			:key="`${column.key}-header`"
			class="kt-table2__header"
			:class="getDragClass(column.key)"
			draggable
			@dragend="doDragCancel"
			@dragenter="() => setDragHover(column.key)"
			@dragover.prevent
			@dragstart="() => setDragSource(column.key)"
			@drop="() => doDragAndDrop(column.key)"
		>
			<i v-if="column.icon" class="yoco" v-text="column.icon" />
			<div v-text="column.label" />
			{{ renderFunction() }}
		</div>
		<div v-for="cell in cells" :key="cell.key" class="kt-table2__cell">
			{{ cell.key }} {{ cell.content }}
		</div>
	</div>
</template>

<script lang="tsx">
import { computed, defineComponent } from '@vue/composition-api'
import { get } from 'lodash'

import { Kotti } from '../types'

import { useDragAndDrop } from './hooks/useDragAndDrop'

type Cell = {
	content: unknown
	key: string
}

export default defineComponent<Kotti.Table2.InternalProps>({
	name: 'KtTable2',
	props: {
		columns: {
			required: true,
			type: Array,
			validator: (columns: unknown): columns is Array<Kotti.Table2.Column> =>
				Array.isArray(columns) &&
				columns.every(
					(column) =>
						typeof column === 'object' &&
						column !== null &&
						Object.prototype.hasOwnProperty.call(column, 'key') &&
						Object.prototype.hasOwnProperty.call(column, 'label'),
				) &&
				new Set(columns.map(({ key }) => key)).size === columns.length,
		},
		isLoading: { default: false, type: Boolean },
		isRowDisabled: { default: () => false, type: Function },
		renderEmpty: { default: null, type: Function },
		rowActions: { default: () => [], type: Function },
		rows: {
			required: true,
			type: Array,
			validator: (rows: unknown): rows is Array<Kotti.Table2.Row> =>
				Array.isArray(rows) &&
				rows.every(
					(row) =>
						typeof row === 'object' &&
						row !== null &&
						Object.prototype.hasOwnProperty.call(row, 'id'),
				),
		},
		selectedRows: { default: () => [], type: Array },
		sort: { default: null, type: Object },
	},
	setup(props, { emit }) {
		// const translations = useTranslationNamespace('KtTable2')
		// if (props.renderEmpty === null) translations.value.emptyText

		return {
			...useDragAndDrop({
				columns: computed(() => props.columns),
				emit,
			}),
			cells: computed((): Cell[] =>
				props.rows.flatMap((row) =>
					props.columns.map((column) => ({
						content: get(row, column.key),
						key: `${column.key}-${String(row.id)}`,
					})),
				),
			),
			style: computed(() => `--column-count: ${props.columns.length}`),
			renderFunction: () => () => <div>SOME TSX</div>,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-table2 {
	display: grid;
	grid-template-columns: repeat(var(--column-count), auto);

	> div {
		margin: -0.5px;
	}

	&__header {
		display: flex;
		align-items: center;

		font-weight: bold;
		cursor: grab;
		border-bottom: 1px solid red;
		transition: all ease-in-out var(--transition-short);

		&--is-dragged-over {
			margin-left: -3px;
			border-left: 3px solid red;
		}
	}

	&__cell {
		border: 1px solid blue;
	}
}

@media screen and (max-width: 800px) {
	.kt-table2 {
		grid-template-columns: auto;
	}
}
</style>
