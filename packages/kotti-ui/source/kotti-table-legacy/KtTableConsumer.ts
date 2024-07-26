/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableColumnsStateMixin } from './mixins'

// eslint-disable-next-line @typescript-eslint/naming-convention
const KtTableConsumer: any = {
	name: 'KtTableConsumer',
	mixins: [TableColumnsStateMixin],
	props: {
		id: { default: null, type: String },
	},
	watch: {
		id(id: any) {
			// @ts-expect-error KtSelectedTableId will exist at runtime
			this.KtSelectedTableId = id
		},
	},
	created(): void {
		this.KtSelectedTableId = this.id
	},
	render(): any {
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

		// eslint-disable-next-line unicorn/consistent-destructuring
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

export { KtTableConsumer }
