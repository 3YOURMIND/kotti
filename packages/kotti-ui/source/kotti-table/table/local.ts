import clone from 'lodash/clone'
import type { Ref } from 'vue'
import { watch } from 'vue'

import type { KottiTable } from './types'

/** @public */
export type SortMode = 'ascending' | 'descending'
/** @public */
export type SortInstruction = -1 | 0 | 1

const SORT_MAP: Record<
	SortMode,
	Record<
		'A_IS_B' | 'A_IS_NULL' | 'A_IS_SMALLER' | 'B_IS_NULL' | 'B_IS_SMALLER',
		SortInstruction
	>
> = {
	ascending: {
		A_IS_B: 0, // A and B are equal, no change in order
		A_IS_NULL: 1, // A is null, so it should move after B
		A_IS_SMALLER: -1, // A is smaller than B, so it should move before B
		B_IS_NULL: -1, // B is null, so A should move before B
		B_IS_SMALLER: 1, // B is smaller than A, so it should move after A
	},
	descending: {
		A_IS_B: 0, // A and B are equal, no change in order
		A_IS_NULL: 1, // A is null, so it should move after B (same as ascending)
		A_IS_SMALLER: 1, // A is smaller than B, so it should move after B
		B_IS_NULL: -1, // B is null, so A should move before B (same as ascending)
		B_IS_SMALLER: -1, // B is smaller than A, so it should move before A
	},
}

export function getNumericalSorter<T extends Record<string, unknown>>(
	mapper: (data: T) => number | null,
	mode: SortMode,
): (a: T, b: T) => SortInstruction {
	const map = SORT_MAP[mode]

	return function mappedNumericalSorter(a: T, b: T) {
		const valueA = mapper(a)
		const valueB = mapper(b)

		// values are equal
		if (valueA === valueB) return map.A_IS_B

		// always punish null
		if (valueA === null) return map.A_IS_NULL
		if (valueB === null) return map.B_IS_NULL

		return valueA < valueB ? map.A_IS_SMALLER : map.B_IS_SMALLER
	}
}

export function getDateSorter<T extends Record<string, unknown>>(
	mapper: (data: T) => Date | null,
	mode: SortMode,
): (a: T, b: T) => SortInstruction {
	const map = SORT_MAP[mode]

	return function mappedDateSorter(a: T, b: T) {
		const valueA = mapper(a)
		const valueB = mapper(b)

		// values are equal (nulls)
		if (valueA === null && valueB === null) return map.A_IS_B

		// always punish null
		if (valueA === null) return map.A_IS_NULL
		if (valueB === null) return map.B_IS_NULL

		// values are equal (dates)
		if (valueA <= valueB && valueB <= valueA) return map.A_IS_B

		return valueA < valueB ? map.A_IS_SMALLER : map.B_IS_SMALLER
	}
}

export function getTextSorter<T extends Record<string, unknown>>(
	mapper: (data: T) => string | null,
	mode: SortMode,
): (a: T, b: T) => SortInstruction {
	const map = SORT_MAP[mode]

	return function mappedTextSorter(a: T, b: T) {
		const valueA = mapper(a)
		const valueB = mapper(b)

		// values are equal
		if (valueA === valueB) return map.A_IS_B

		// always punish null
		if (valueA === null) return map.A_IS_NULL
		if (valueB === null) return map.B_IS_NULL

		return valueA.localeCompare(valueB) < 0
			? map.A_IS_SMALLER
			: map.B_IS_SMALLER
	}
}

export const useLocalSort = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>({
	locallySortedData,
	ordering,
	rawData,
	sortingFunctions,
}: {
	locallySortedData: Ref<ROW[]>
	ordering: Ref<KottiTable.Ordering<COLUMN_ID>[]>
	rawData: Ref<ROW[]>
	sortingFunctions: Record<
		COLUMN_ID,
		(mode: 'ascending' | 'descending') => (a: ROW, b: ROW) => SortInstruction
	>
}): void => {
	watch(
		[rawData, ordering],
		() => {
			const sort = ordering.value[0] ?? null

			if (sort === null) {
				locallySortedData.value = rawData.value
				return
			}

			locallySortedData.value = clone(rawData.value).sort(
				sortingFunctions[sort.id](sort.value),
			)
		},
		{ immediate: true },
	)
}
