// Code is taken from https://github.com/TanStack/table/discussions/4930

import type {
	RowData,
	Table,
	TableOptions,
	TableOptionsResolved,
} from '@tanstack/table-core'
import { createTable } from '@tanstack/table-core'
import {
	computed,
	defineComponent,
	h,
	type Ref,
	shallowRef,
	unref,
	watch,
} from 'vue'

// Such a silly hack to not get a new element
const createTextVNode = (text: string) => h('span', text).children?.[0]

/**
 * Vue 2 Compatible version of `FlexRender`
 *
 * Props:
 * - `render` {any} - A function, component, string or number
 * - `props` {object} - Props to pass to the render function or component
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
 * @example
 *
 * ```ts
 * // Simple usage with a static data set and no controlled state
 * const table = useVueTable({
 *   getCoreRowModel: getCoreRowModel(),
 *   data,
 *   columns,
 * });
 *
 * // Usage with controlled state
 * const table = useVueTable(computed(() => ({
 *  getCoreRowModel: getCoreRowModel(),
 *  data: data.value,
 *  columns,
 * })));
 * ```
 */
export const useVueTable = <T_DATA extends RowData>(
	options: Ref<TableOptions<T_DATA>>,
): Ref<Table<T_DATA>> => {
	const optionsRef = computed(() => unref(options))
	const resolvedOptions: TableOptionsResolved<T_DATA> = {
		onStateChange: () => {}, // noop
		renderFallbackValue: null,
		state: {}, // Dummy state
		...optionsRef.value,
	}

	// There is some hacky stuff happening here to force vue to re-render the table.
	// Hopefully this only has to live until we reach vue 3 and we can go to using the
	// public vue package.
	const internalTable = createTable<T_DATA>(resolvedOptions)
	const table = shallowRef(internalTable)
	const state = shallowRef(internalTable.initialState)

	watch(
		[optionsRef, state],
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
