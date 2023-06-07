import { KottiI18n } from '../types'

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

export const enUS: KottiI18n.Messages = {
	KtBanner: {
		expandLabel: 'View',
		expandCloseLabel: 'Close',
	},
	KtComment: {
		cancelMessage: 'Press Esc key to cancel',
		deleteButton: 'Delete',
		editButton: 'Edit',
		editedLabel: 'Edited',
		internalLabel: 'Restricted access',
		lockedHelpText: 'Restricted access',
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
			review: 'Review',
			unknown: 'Unknown',
		},
		statusMsg: {
			CANCELED: 'Canceled',
			ERROR: 'Upload failed, please try again',
			INVALID: 'Invalid',
			NOT_STARTED: 'Not started',
			UPLOADED: 'Uploaded',
			UPLOADED_WITH_ERROR: 'Uploaded with error',
			UPLOADING: 'Uploading...',
			READY_TO_UPLOAD: 'Ready to upload on submittal',
		},
		text: {
			clickToUpload: 'Click to upload',
			dragAndDrop: 'or drag and drop',
			learnMore: 'Learn more',
			max: 'max.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'File format not supported',
			MAX_SIZE_EXCEEDED: 'Maximum file size allowed exceeded',
		},
	},
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'This field is required',
	},
	KtFieldSelects: {
		loadingText: 'Loading',
		noMatchText: 'No matching data',
		noDataText: 'No results',
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
}
