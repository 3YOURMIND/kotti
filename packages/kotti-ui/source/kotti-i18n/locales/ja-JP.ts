import { KottiI18n } from '../types'

namespace Common {
	export const is = 'です'

	export const isEmpty = '空です'

	export const number = {
		EQUAL: 'に等しい',
		GREATER_THAN: 'より大きい',
		GREATER_THAN_OR_EQUAL: '以上',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'よりも少ない',
		LESS_THAN_OR_EQUAL: '以下である',
	}
}

export const jaJP: KottiI18n.Messages = {
	KtBanner: {
		expandLabel: '表示',
		expandCloseLabel: '閉じる',
	},
	KtComment: {
		postButton: '送信',
		replyButton: '返信',
		replyPlaceholder: '返信',
	},
	KtFields: {
		optionalLabel: '任意',
		requiredMessage: 'このフィールドは必須です。',
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
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'すべてクリア',
		currency: Common.number,
		dateRange: {
			IN_RANGE: '範囲内です',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'フィルタが適用されていません',
		filterLabel: 'フィルタ',
		filtersLabel: 'フィルタ',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: 'の一つであります',
		},
		searchLabel: '探す',
		singleEnum: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		string: {
			CONTAINS: '含まれています',
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		unsetLabel: '設定解除',
		whereLabel: 'どこ',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'エラー',
		title: 'フォーム送信ができない',
		warningsSectionTitle: '注意事項',
	},
	KtInlineEdit: {
		placeholder: '編集画面へ',
	},
	KtNavbar: {
		menuCollapse: 'メニューを閉じる',
		menuExpand: '拡張メニュー',
		quickLinksTitle: 'クイックリンク',
	},
}
