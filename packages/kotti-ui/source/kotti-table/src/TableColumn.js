import pick from 'lodash/pick'

import {
	SORT_ASC,
	SORT_DSC,
	SORT_NONE,
	COLUMN_TYPE,
	DEFAULT_RENDER_CELL,
	KT_TABLE,
	KT_STORE,
	KT_LAYOUT,
	DEFAULT_RENDER_HEADER,
} from './constants'

let columnIdSeed = 1

function updateColumnsfor(prop) {
	return function updateColumnProp(newVal) {
		if (this.columnConfig) {
			this.columnConfig[prop] = newVal
			this[KT_STORE].commit('updateColumns')
		}
	}
}

export const KtTableColumn = {
	name: 'KtTableColumn',
	inheritAttrs: false,
	props: {
		prop: { required: true, type: String },
		index: Number,
		order: Number,
		label: String,

		tdClass: String,
		thClass: String,
		headerCellClass: String,
		cellClass: String,

		align: String,
		width: String,
		maxWidth: String,
		minWidth: String,

		hidden: { default: undefined, type: Boolean },

		// whether this column is sortable, string means sortOrder is remote
		sortable: { default: undefined, type: [Boolean, String, undefined] },
		sortOrder: { default: SORT_NONE, type: [Number, String] },
		sortOrders: { type: Array, default: () => [SORT_ASC, SORT_DSC, SORT_NONE] },
		sortMethod: Function,
		sortBy: [String, Array],

		disableRowClick: { default: undefined, type: [Boolean, undefined] },
		default: [Function, String],
		formatter: Function,
		renderHeader: Function,
		renderCell: Function,

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
	beforeCreate() {
		this.columnConfig = {}
	},
	created() {
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		this.columnConfig = createColumn(this)
	},
	mounted() {
		const columnIndex = this[KT_TABLE].$children.indexOf(this)
		this[KT_STORE].commit('insertColumn', {
			column: this.columnConfig,
			...(columnIndex !== -1 ? { index: columnIndex } : {}),
			fromTableColumn: true,
		})
	},
	destroyed() {
		if (!this.$parent) return
		this.columnConfig &&
			this[KT_STORE].commit('removeColumn', this.columnConfig)
	},
	render: () => null,
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
}

function createColumn(column = {}) {
	const _self = column

	let columnId = column.id
	if (!columnId) {
		columnId = `${_self[KT_TABLE].tableId}_column_${columnIdSeed}`
		columnIdSeed++
	}
	// eslint-disable-next-line no-param-reassign
	column = pick(column, [...Object.keys(KtTableColumn.props), '$attrs'])

	column.sortOrder = column.sortOrder || SORT_NONE
	column.sortOrders = column.sortOrders || [SORT_ASC, SORT_DSC, SORT_NONE]
	column.formatter = column.formatter || ((value) => value)

	column.id = columnId
	column.type = COLUMN_TYPE
	// needed for maintaining column state across re-renders as column get removed and re-inserted
	column._deleted = false

	let renderCell = column.renderCell
	let renderHeader = column.renderHeader

	column.renderCell = function render(h, data) {
		if (_self.$scopedSlots && _self.$scopedSlots.default) {
			renderCell = () => _self.$scopedSlots.default(data)
		}

		if (!renderCell) {
			renderCell = DEFAULT_RENDER_CELL
		}
		return renderCell(h, data)
	}

	column.renderHeader = function render(h, data) {
		if (_self.$scopedSlots && _self.$scopedSlots.header) {
			renderHeader = () => _self.$scopedSlots.header(data)
		}

		if (!renderHeader) {
			renderHeader = DEFAULT_RENDER_HEADER
		}

		return renderHeader(h, data)
	}

	return column
}
