/* eslint-disable sonarjs/no-duplicate-string */
import { KottiTranslation } from '../types'

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
			EQUAL: 'is',
			IS_EMPTY: 'is empty',
		},
		clearAllLabel: 'Clear All',
		currency: {
			EQUAL: 'is equal to',
			GREATER_THAN: 'is greater than',
			GREATER_THAN_OR_EQUAL: 'is greater than or equal to',
			IS_EMPTY: 'is empty',
			LESS_THAN: 'is less than',
			LESS_THAN_OR_EQUAL: 'is less than or equal to',
		},
		dateRange: {
			IN_RANGE: 'is in range',
			IS_EMPTY: 'is empty',
		},
		disabledLabel: 'Disabled',
		emptyListLabel: 'No Filters Applied',
		enabledLabel: 'Enabled',
		filterLabel: 'Filter',
		filtersLabel: 'Filters',
		float: {
			EQUAL: 'is equal to',
			GREATER_THAN: 'is greater than',
			GREATER_THAN_OR_EQUAL: 'is greater than or equal to',
			IS_EMPTY: 'is empty',
			LESS_THAN: 'is less than',
			LESS_THAN_OR_EQUAL: 'is less than or equal to',
		},
		integer: {
			EQUAL: 'is equal to',
			GREATER_THAN: 'is greater than',
			GREATER_THAN_OR_EQUAL: 'is greater than or equal to',
			IS_EMPTY: 'is empty',
			LESS_THAN: 'is less than',
			LESS_THAN_OR_EQUAL: 'is less than or equal to',
		},
		multiEnum: {
			IS_EMPTY: 'is empty',
			ONE_OF: 'is one of',
		},
		searchLabel: 'Search',
		singleEnum: {
			EQUAL: 'is',
			IS_EMPTY: 'is empty',
		},
		string: {
			CONTAINS: 'contains',
			EQUAL: 'is',
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
