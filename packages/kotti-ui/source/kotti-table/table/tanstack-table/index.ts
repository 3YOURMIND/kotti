/**
 * Code is taken from https://github.com/TanStack/table/discussions/4930
 */

import type {
	RowData,
	Table,
	TableOptions,
	TableOptionsResolved,
} from '@tanstack/table-core'
import { createTable } from '@tanstack/table-core'
import { defineComponent, h, type Ref, shallowRef, watch } from 'vue'

const createTextVNode = (text: string) => h('span', text).children?.[0]

/**
 * Vue 2 Compatible version of `FlexRender`
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlexRender = defineComponent({
	name: 'FlexRender',
	props: ['render', 'props'],
	setup: (props) => () => {
		if (typeof props.render === 'function') {
			const rendered = props.render(props.props)

			// If it is a VNODE we have to wrap it in a function
			if (typeof rendered === 'object') {
				return rendered
			}

			return createTextVNode(rendered)
		}

		if (typeof props.render === 'object') {
			return h(props.render, props.props)
		}

		return createTextVNode(props.render)
	},
})

/**
 * Vue 2 reactivity wrapper around TanStack Table Core `createTable`
 *
 * FIXME: replace this with the official package `@tanstack/vue-table` in vue3
 * @link https://www.npmjs.com/package/@tanstack/vue-table
 */
export const useVueTable = <T_DATA extends RowData>(
	options: Ref<TableOptions<T_DATA>>,
): Ref<Table<T_DATA>> => {
	const resolvedOptions: TableOptionsResolved<T_DATA> = {
		onStateChange: () => {},
		renderFallbackValue: null,
		state: {},
		...options.value,
	}

	const internalTable = createTable<T_DATA>(resolvedOptions)
	const table = shallowRef(internalTable)
	const state = shallowRef(internalTable.initialState)

	watch(
		[options, state],
		([optionsVal, stateVal]) => {
			internalTable.setOptions((prev) => ({
				...prev,
				...optionsVal,
				onStateChange: (updater) => {
					state.value =
						typeof updater === 'function' ? updater(stateVal) : updater

					optionsVal.onStateChange?.(updater)
				},
				state: {
					...stateVal,
					...optionsVal.state,
				},
			}))

			// Force rerender
			table.value = { ...internalTable }
		},
		{ immediate: true },
	)

	return table
}
