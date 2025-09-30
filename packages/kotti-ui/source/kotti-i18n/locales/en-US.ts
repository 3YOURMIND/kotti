import type { KottiI18n } from '../types'

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

	export const restrictedAccess = 'Restricted access'
}

export const enUS: KottiI18n.Messages = {
	KtComment: {
		cancelMessage: 'Press Esc key or',
		clickToCancelLabel: 'click to cancel',
		deleteButton: 'Delete',
		editButton: 'Edit',
		editedLabel: 'Edited',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Post',
		replyButton: 'Reply',
		replyToLabel: 'Reply to',
		unlockedHelpText: 'Visible to all users',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: 'Use Photo',
			cancel: 'Cancel',
			nextCamera: 'Next Camera',
			rejectPhoto: 'Retake Photo',
			retry: 'Retry',
			takePhoto: 'Take Photo',
		},
		error: {
			multipleNotAllowed: 'Multiple files upload not allowed',
			notAllowed: 'Permission denied to use the camera',
			notFound: 'No available camera found',
			notSupported: 'No compatible camera found',
		},
		label: {
			capture: 'Take Photo',
			error: 'Error',
			internal: Common.restrictedAccess,
			review: 'Review',
			unknown: 'Unknown',
		},
		statusMsg: {
			CANCELED: 'Canceled',
			ERROR: 'Upload failed, please try again',
			HIDDEN: '',
			INVALID: 'Invalid',
			NOT_STARTED: 'Not started',
			READY_TO_UPLOAD: 'Ready to upload',
			UPLOADED: 'Uploaded',
			UPLOADED_WITH_ERROR: 'Uploaded with error',
			UPLOADING: 'Uploading...',
		},
		text: {
			clickToUpload: 'Click to upload',
			dragAndDrop: 'or drag and drop your files here',
			learnMore: 'Learn more',
			max: 'max.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'File format not supported',
			MAX_SIZE_EXCEEDED: 'Maximum file size allowed exceeded',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Click to Edit',
	},
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'This field is required',
	},
	KtFieldSelects: {
		loadingText: 'Loading',
		noDataText: 'No results',
		noMatchText: 'No matching data',
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
		emptyListLabel: 'No Filters Applied',
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
	KtStandardTable: {
		clearAll: 'Clear All',
		editColumns: 'Edit Columns',
		editFilters: 'Edit Filters',
		endDate: 'End',
		itemsPerPage: 'Items per page',
		lastMonth: 'Last Month',
		lastWeek: 'Last Week',
		lastYear: 'Last Year',
		max: 'Max.',
		min: 'Min.',
		moreThan: 'More Than',
		resultsCounter:
			'No items | {range} of {total} item | {range} of {total} items',
		search: 'Search',
		selectionCount: '| {count} item selected | {count} items selected',
		showAll: 'Show All',
		startDate: 'Start',
		today: 'Today',
		upTo: 'Up To',
	},
	KtTable: {
		no: 'No',
		noItems: 'No items',
		yes: 'Yes',
	},
	KtValueLabel: {
		notSet: 'Not Set',
	},
}
