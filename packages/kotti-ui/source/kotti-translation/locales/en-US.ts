import { KottiTranslation } from '../types'

export const enUS: KottiTranslation.Messages = {
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
			EQUAL: 'is',
			IS_EMPTY: 'is empty',
		},
		clearAllLabel: 'Clear All',
		dateRange: {
			IN_RANGE: 'is in range',
			IS_EMPTY: 'is empty',
		},
		disabledLabel: 'Disabled',
		emptyListLabel: 'No Filters Applied',
		enabledLabel: 'Enabled',
		filterLabel: 'Filter',
		filtersLabel: 'Filters',
		multiEnum: {
			IS_EMPTY: 'is empty',
			ONE_OF: 'is one of',
		},
		number: {
			EQUAL: 'is equal to',
			GREATER_THAN: 'is greater than',
			GREATER_THAN_OR_EQUAL: 'is greater than or equal to',
			IS_EMPTY: 'is empty',
			LESS_THAN: 'is less than',
			LESS_THAN_OR_EQUAL: 'is less than or equal to',
		},
		searchLabel: 'Search',
		singleEnum: {
			EQUAL: 'is',
			IS_EMPTY: 'is empty',
		},
		string: {
			CONTAINS: 'contains',
			IS_EMPTY: 'is empty',
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
