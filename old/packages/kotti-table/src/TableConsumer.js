import { TableColumnsStateMixin } from './mixins'

export default {
	components: {},
	name: 'KtTableConsumer',
	mixins: [TableColumnsStateMixin],
	props: {
		id: { default: null, type: String },
	},
	created() {
		this.KtSelectedTableId = this.id
	},
	watch: {
		id(id) {
			this.KtSelectedTableId = id
		},
	},
	render() {
		const {
			KtTableStore: store,
			KtTableColumns: columns,
			KtTableHiddenColumns: hiddenColumns,
			KtTableSortedColumns: sortedColumns,
			KtTableFilteredColumns: filteredColumns,
			KtTableHideColumn: hideColumn,
			KtTableShowAllColumns: showAllColumns,
			KtTableOrderBeforeColumn: orderBeforeColumn,
		} = this
		return this.$scopedSlots.default({
			store,
			columns,
			hiddenColumns,
			sortedColumns,
			filteredColumns,
			hideColumn,
			showAllColumns,
			orderBeforeColumn,
		})
	},
}
