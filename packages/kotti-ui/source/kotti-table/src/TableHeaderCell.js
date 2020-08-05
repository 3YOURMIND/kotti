export const TableHeaderCell = {
	name: 'TableHeaderCell',
	functional: true,
	props: ['column', 'columnIndex'],
	render(h, context) {
		const { column, columnIndex } = context.props
		return column.renderHeader(h, {
			column,
			value: column.label,
			columnIndex,
		})
	},
}
