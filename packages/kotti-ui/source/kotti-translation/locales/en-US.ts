import { KottiTranslation } from '../types'

namespace Common {
	export const is = 'is'

	export const isEmpty = 'is empty'

	export const number = {
		EQUAL: 'is equal to',
		GREATER_THAN: 'is greater than',
		GREATER_THAN_OR_EQUAL: 'is greater than or equal to',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'is less than',
		LESS_THAN_OR_EQUAL: 'is less than or equal to',
	}
}

export const enUS: KottiTranslation.Messages = {
	KtBanner: {
		expandLabel: 'View',
		expandCloseLabel: 'Close',
	},
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'This field is required',
	},
	KtFieldSelects: {
		loadingText: 'Loading',
		noMatchText: 'No matching data',
		noDataText: 'No data',
		placeholder: 'Select',
	},
	KtFilters: {
		addFilterLabel: 'Add Filter',
		andLabel: 'And',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Clear All',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'is in range',
			IS_EMPTY: Common.isEmpty,
		},
		disabledLabel: 'Disabled',
		emptyListLabel: 'No Filters Applied',
		enabledLabel: 'Enabled',
		filterLabel: 'Filter',
		filtersLabel: 'Filters',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: 'is one of',
		},
		searchLabel: 'Search',
		singleEnum: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		string: {
			CONTAINS: 'contains',
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		unsetLabel: 'Unset',
		whereLabel: 'Where',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Errors',
		title: 'Form Submission Not Allowed',
		warningsSectionTitle: 'Warnings',
	},
	KtNavbar: {
		menuCollapse: 'Collapse menu',
		menuExpand: 'Expand menu',
		quickLinksTitle: 'Quick Links',
	},
}
