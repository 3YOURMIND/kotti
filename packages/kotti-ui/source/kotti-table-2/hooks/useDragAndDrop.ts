import { ref, Ref, SetupContext } from '@vue/composition-api'

import { Kotti } from '../../types'
import { KtTable2Errors } from '../errors'
export const useDragAndDrop = ({
	columns,
	emit,
}: {
	columns: Ref<Kotti.Table2.InternalProps['columns']>
	emit: SetupContext['emit']
}) => {
	const dragHover = ref<string | null>(null)
	const dragSource = ref<string | null>(null)

	const doDragCancel = () => {
		dragHover.value = null
		dragSource.value = null
	}

	return {
		doDragAndDrop: (dropTarget: string) => {
			console.log(`dragged ${dragSource.value} to ${dropTarget}`)
			const columnKeys = columns.value.map((x) => x.key)

			const source = dragSource.value
			if (source === null) throw new KtTable2Errors.UnexpectedDragSourceType()

			const payload: Kotti.Table2.Events.UpdateOrderedColumns = columnKeys
				.filter((x) => x !== source)
				.flatMap((x) => (x === dropTarget ? [dropTarget, source] : x))

			emit('update:orderedColumns', payload)
			doDragCancel()
		},
		doDragCancel,
		getDragClass: (key: string) =>
			key === dragHover.value && dragSource.value !== key
				? 'kt-table2__header--is-dragged-over'
				: undefined,
		isDraggedOver: (key: string) => key === dragHover.value,
		setDragHover: (key: string | null) => {
			dragHover.value = key
		},
		setDragSource: (key: string | null) => {
			dragSource.value = key
		},
	}
}
