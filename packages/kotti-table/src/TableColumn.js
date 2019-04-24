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

export let columnIdSeed = 1

const TableColumn = {
	name: 'KtTableColumn',
	inheritAttrs: false,
	render: () => null,
	inject: { KT_TABLE, KT_STORE, KT_LAYOUT },
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

		hidden: { type: Boolean, default: false },

		sortable: { type: [Boolean, String, undefined], default: undefined }, // wether this column is sortable, string means sortOrder is remote
		sortOrder: { type: [Number, String], default: SORT_NONE }, // one of "ascending", "descending", undefined
		sortOrders: { type: Array, default: () => [SORT_ASC, SORT_DSC, SORT_NONE] },
		sortMethod: Function,
		sortBy: [String, Array], // if not defined uses column prop

		disableRowClick: { type: Boolean, default: false },
		default: [Function, String],
		formatter: Function,
		renderHeader: Function,
		renderCell: Function,
		renderContext: Object,
	},
	beforeCreate() {
		this.columnConfig = {}
	},
	created() {
		this.columnConfig = createColumn(this)
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
		default: updateColumnsfor('default'),
	},
	mounted() {
		this.columnConfig.index =
			this.columnConfig.index || [].indexOf.call(this[KT_TABLE].$children, this)
		this[KT_STORE].commit('insertColumn', this.columnConfig)
	},
	destroyed() {
		if (!this.$parent) return
		this[KT_STORE].commit('removeColumn', this.columnConfig)
	},
}

export default TableColumn

function updateColumnsfor(prop) {
	return function updateColulmnProp(newVal) {
		if (this.columnConfig) {
			this.columnConfig[prop] = newVal
			this[KT_STORE].commit('updateColumns')
		}
	}
}

function createColumn(column = {}) {
	// eslint-disable-next-line no-underscore-dangle
	const _self = column

	let columnId = column.id
	if (!columnId) {
		columnId = `${_self[KT_TABLE].tableId}_column_${columnIdSeed}`
		columnIdSeed++
	}

	column = pick(column, [...Object.keys(TableColumn.props), '$attrs'])

	column.sortOrder = column.sortOrder || SORT_NONE
	column.sortOrders = column.sortOrders || [SORT_ASC, SORT_DSC, SORT_NONE]
	column.formatter = column.formatter || (value => value)

	column.id = columnId
	column.type = COLUMN_TYPE

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
