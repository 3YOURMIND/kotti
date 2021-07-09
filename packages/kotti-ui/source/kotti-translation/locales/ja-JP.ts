import { KottiTranslation } from '../types'

// TODO: needs proper translations for some strings
export const jaJP: KottiTranslation.Messages = {
	KtBanner: {
		expandLabel: '表示',
		expandCloseLabel: '閉じる',
	},
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'Required',
	},
	KtFieldSelects: {
		loadingText: 'ロード中',
		noMatchText: 'データなし',
		noDataText: 'データなし',
		placeholder: '選択してください',
	},
	// TODO check KtFilters translations
	KtFilters: {
		addFilterLabel: 'フィルタを追加',
		andLabel: 'そして',
		boolean: {
			EQUAL: 'です',
			IS_EMPTY: '空です',
		},
		clearAllLabel: 'すべてクリア',
		currency: {
			EQUAL: 'に等しい',
			GREATER_THAN: 'より大きい',
			GREATER_THAN_OR_EQUAL: '以上',
			IS_EMPTY: '空です',
			LESS_THAN: 'よりも少ない',
			LESS_THAN_OR_EQUAL: '以下である',
		},
		dateRange: {
			IN_RANGE: '範囲内です',
			IS_EMPTY: '空です',
		},
		disabledLabel: '無効',
		emptyListLabel: 'フィルタが適用されていません',
		enabledLabel: '有効',
		filterLabel: 'フィルタ',
		filtersLabel: 'フィルタ',
		integer: {
			EQUAL: 'に等しい',
			GREATER_THAN: 'より大きい',
			GREATER_THAN_OR_EQUAL: '以上',
			IS_EMPTY: '空です',
			LESS_THAN: 'よりも少ない',
			LESS_THAN_OR_EQUAL: '以下である',
		},
		multiEnum: {
			IS_EMPTY: '空です',
			ONE_OF: 'の一つであります',
		},
		searchLabel: '探す',
		singleEnum: {
			EQUAL: 'です',
			IS_EMPTY: '空です',
		},
		string: {
			CONTAINS: '含まれています',
			EQUAL: 'です',
			IS_EMPTY: '空です',
		},
		unsetLabel: '設定解除',
		whereLabel: 'どこ',
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
