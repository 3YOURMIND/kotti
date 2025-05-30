/* eslint-disable perfectionist/sort-objects */
/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash/pick.js'
import type { CreateElement } from 'vue'

import {
	COLUMN_TYPE,
	DEFAULT_RENDER_CELL,
	DEFAULT_RENDER_HEADER,
	KT_STORE,
	KT_TABLE,
} from './constants'
import { KottiTableLegacy } from './types'

let columnIdSeed = 1

function updateColumnsfor(prop: any) {
	return function updateColumnProp(newVal: unknown) {
		// @ts-expect-error columnConfig will exist at runtime
		if (this.columnConfig) {
			// @ts-expect-error columnConfig will exist at runtime
			this.columnConfig[prop] = newVal
			// @ts-expect-error columnConfig will exist at runtime
			this[KT_STORE].commit('updateColumns')
		}
	}
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const KtTableLegacyColumn: any = {
	name: 'KtTableLegacyColumn',
	inheritAttrs: false,
	props: {
		index: { required: false, type: Number },
		label: { required: false, type: String },
		order: { required: false, type: Number },
		prop: { required: true, type: String },

		cellClass: { required: false, type: [String, Array, Object] },
		headerCellClass: { required: false, type: [String, Array, Object] },
		tdClass: { required: false, type: [String, Array, Object] },
		thClass: { required: false, type: [String, Array, Object] },

		align: { default: KottiTableLegacy.Column.Align.LEFT, type: String },
		maxWidth: { required: false, type: String },
		minWidth: { required: false, type: String },
		width: { default: 'auto', type: String },

		hidden: { default: false, type: Boolean },

		sortBy: { required: false, type: [String, Function, Array] },
		sortMethod: { default: null, type: Function },
		sortOrder: {
			default: KottiTableLegacy.Column.SortOrders.NONE,
			type: [String, Number],
		},
		sortOrders: {
			default: (): KottiTableLegacy.Column.SortOrders[] =>
				Object.values(KottiTableLegacy.Column.SortOrders),
			type: Array,
		},
		// whether this column is sortable, string means sortOrder is remote
		sortable: { default: undefined, type: [Boolean, String, undefined] },

		default: { required: false, type: String },
		disableRowClick: { default: false, type: Boolean },
		formatter: { required: false, type: Function },
		renderCell: { required: false, type: Function },
		renderHeader: { required: false, type: Function },

		/**
		 * @private
		 */
		isPropDefined: { default: false, type: Boolean },
	},
	watch: {
		label: updateColumnsfor('label'),
		index: updateColumnsfor('index'),
		tdClass: updateColumnsfor('tdClass'),
		thClass: updateColumnsfor('thClass'),
		headerCellClass: updateColumnsfor('headerCellClass'),
		cellClass: updateColumnsfor('cellClass'),
		prop: updateColumnsfor('prop'),
		hidden: updateColumnsfor('hidden'),
		sortable: updateColumnsfor('sortable'),
		sortOrder: updateColumnsfor('sortOrder'),
		order: updateColumnsfor('order'),
		width: updateColumnsfor('width'),
		maxWidth: updateColumnsfor('maxWidth'),
		minWidth: updateColumnsfor('minWidth'),
		align: updateColumnsfor('align'),
		default: updateColumnsfor('default'),
	},
	beforeCreate(): void {
		this.columnConfig = {}
	},
	created(): void {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		this.columnConfig = createColumn(this)
	},
	mounted(): void {
		const columnIndex = this[KT_TABLE as symbol].$children.indexOf(this)
		this[KT_STORE as any].commit('insertColumn', {
			column: this.columnConfig,
			...(columnIndex !== -1 ? { index: columnIndex } : {}),
		})
	},
	destroyed(): void {
		if (!this.$parent) return
		if (this.columnConfig)
			this[KT_STORE as any].commit('removeColumn', this.columnConfig)
	},
	render: (): null => null,
	inject: { KT_TABLE, KT_STORE },
}

function createColumn(column: any = {}) {
	const _self = column

	let columnId = column.id
	if (!columnId) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		columnId = `${_self[KT_TABLE as symbol].tableId}_column_${columnIdSeed}`
		columnIdSeed++
	}
	// eslint-disable-next-line no-param-reassign
	column = pick(column, [...Object.keys(KtTableLegacyColumn.props), '$attrs'])

	column.sortOrder = column.sortOrder || KottiTableLegacy.Column.SortOrders.NONE
	column.sortOrders =
		column.sortOrders || Object.values(KottiTableLegacy.Column.SortOrders)
	column.formatter = column.formatter || ((value: any) => value)

	column.id = columnId
	column.type = COLUMN_TYPE
	// needed for maintaining column state across re-renders as column get removed and re-inserted
	column._deleted = false

	let renderCell = column.renderCell
	let renderHeader = column.renderHeader

	column.renderCell = function render(h: CreateElement, data: any) {
		if (_self.$scopedSlots?.default) {
			renderCell = () => _self.$scopedSlots.default(data)
		}

		if (!renderCell) {
			renderCell = DEFAULT_RENDER_CELL
		}
		return renderCell(h, data)
	}

	column.renderHeader = function render(h: CreateElement, data: any) {
		if (_self.$scopedSlots?.header) {
			renderHeader = () => _self.$scopedSlots.header(data)
		}

		if (!renderHeader) {
			renderHeader = DEFAULT_RENDER_HEADER
		}

		return renderHeader(h, data)
	}

	return column
}
/* eslint-enable perfectionist/sort-objects */
/* eslint-enable @typescript-eslint/no-explicit-any */
