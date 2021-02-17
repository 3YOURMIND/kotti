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

		const dad = useDragAndDrop({
			columns: computed(() => props.columns),
			emit,
		})

		const cells = computed((): Cell[] =>
			props.rows.flatMap((row) =>
				props.columns.map((column) => ({
					content: get(row, column.key),
					key: `${column.key}-${String(row.id)}`,
				})),
			),
		)

		const renderFunction = () => <div>SOME TSX</div>

		return () => (
			<div
				class="kt-table2"
				style={{
					gridTemplateColumns: Array(props.columns.length)
						.fill('auto')
						.join(' '),
				}}
			>
				{props.columns.map((column) => (
					<div
						key={`${column.key}-header`}
						class={`kt-table2__header ${dad.getDragClass(column.key)}`}
						draggable
						onDragend={dad.doDragCancel}
						onDragenter={() => dad.setDragHover(column.key)}
						onDragover={(event) => event.preventDefault()}
						onDragstart={(event) => {
							event.dataTransfer.effectAllowed = 'move'
							dad.setDragSource(column.key)
						}}
						onDrop={() => dad.doDragAndDrop(column.key)}
					>
						{column.icon !== null && <i class="yoco">{column.icon}</i>}
						<div>{column.label}</div>
						{renderFunction()}
					</div>
				))}
				{cells.value.map((cell) => (
					<div key={cell.key} class="kt-table2__cell">
						{cell.key} {cell.content}
					</div>
				))}
			</div>
		)
	},
})
</script>

<style lang="scss" scoped>
.kt-table2 {
	display: grid;

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
