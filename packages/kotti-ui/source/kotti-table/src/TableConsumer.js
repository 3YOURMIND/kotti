import { TableColumnsStateMixin } from './mixins'

const KtTableConsumer = {
	name: 'KtTableConsumer',
	mixins: [TableColumnsStateMixin],
	props: {
		id: { default: null, type: String },
	},
	watch: {
		id(id) {
			this.KtSelectedTableId = id
		},
	},
	created() {
		this.KtSelectedTableId = this.id
	},
	render() {
		const {
			KtTableStore: store,
			KtTableColumns: columns,
			KtTableHiddenColumns: hiddenColumns,
			KtTableSortedColumns: sortedColumns,
			KtTableHideColumn: hideColumn,
			KtTableShowAllColumns: showAllColumns,
			KtTableOrderBeforeColumn: orderBeforeColumn,
		} = this

		return this.$scopedSlots.default({
			store,
			columns,
			hiddenColumns,
			sortedColumns,
			hideColumn,
			showAllColumns,
			orderBeforeColumn,
		})
	},
}

export { KtTableConsumer }
