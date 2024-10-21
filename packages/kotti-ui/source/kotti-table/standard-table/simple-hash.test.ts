import { describe, expect, it } from 'vitest'

import { simpleHash } from './simple-hash'

describe('simpleHash', () => {
	it('works for basic inputs', () => {
		expect(simpleHash(['a', 'b', 'c'])).toMatchInlineSnapshot(`"3ZQ=="`)
		expect(simpleHash(['abc', 'def', 'cia'])).toMatchInlineSnapshot(`"3ZWFr"`)
		expect(simpleHash(['a', 'abc'])).toMatchInlineSnapshot(`"2BmVm"`)
	})

	it('works for lots of columns', () => {
		expect(
			simpleHash([
				'columns',
				'disableRow',
				'emptyText',
				'expandMultiple',
				'filteredColumns',
				'headerClass',
				'hiddenColumns',
				'id',
				'isInteractive',
				'isScrollable',
				'isSelectable',
				'loading',
				'orderedColumns',
				'remoteSort',
				'renderActions',
				'renderEmpty',
				'renderExpand',
				'renderLoading',
				'rowKey',
				'rows',
				'selected',
				'sortMultiple',
				'sortable',
				'sortedColumns',
				'tdClasses',
				'thClasses',
				'trClasses',
				'useColumnDragToOrder',
				'useQuickSortControl',
			]),
		).toMatchInlineSnapshot(`"29i4gT87ugxwQ0NQjx0WWA5AP6BoY="`)
	})

	it('is reasonably collision resistant', () => {
		expect(simpleHash(['foo', 'foobaz'])).not.toEqual(
			simpleHash(['bar', 'barbaz']),
		)
	})
})
