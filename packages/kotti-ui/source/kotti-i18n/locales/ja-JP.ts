import type { KottiI18n } from '../types'

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

	export const restrictedAccess = '制限付きアクセス'
}

export const jaJP: KottiI18n.Messages = {
	KtComment: {
		cancelMessage: 'Escキーを押すか',
		clickToCancelLabel: 'クリックしてキャンセルします',
		deleteButton: '消す',
		editButton: 'エディット',
		editedLabel: '編集済み',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: '送信',
		replyButton: '返信',
		replyToLabel: '返信',
		unlockedHelpText: 'すべてのユーザーに表示されます',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: '写真を使用',
			cancel: 'キャンセル',
			nextCamera: '次のカメラ',
			rejectPhoto: '写真を撮り直す',
			retry: 'リトライ',
			takePhoto: '写真を撮る',
		},
		error: {
			multipleNotAllowed: '複数のファイルのアップロードは許可されていません',
			notAllowed: 'カメラの使用が拒否されました',
			notFound: '利用可能なカメラが見つかりません',
			notSupported: '互換性のあるカメラが見つかりません',
		},
		label: {
			capture: '写真を撮る',
			error: 'エラー',
			internal: Common.restrictedAccess,
			review: 'レビュー',
			unknown: '知らない',
		},
		statusMsg: {
			CANCELED: 'キャンセル',
			ERROR: 'アップロードに失敗しました。もう一度お試しください',
			HIDDEN: '',
			INVALID: '無効',
			NOT_STARTED: '始まっていない',
			READY_TO_UPLOAD: '提出時にアップロードする準備ができました',
			UPLOADED: 'アップロード済み',
			UPLOADED_WITH_ERROR: 'エラーでアップロードされました',
			UPLOADING: 'アップロード中...',
		},
		text: {
			clickToUpload: 'クリックしてアップロード',
			dragAndDrop: 'or drag and drop your files here',
			learnMore: 'もっと詳しく知る',
			max: '最大',
		},
		validationMsg: {
			INVALID_EXTENSION: 'サポートされていないファイル形式',
			MAX_SIZE_EXCEEDED: '許容される最大ファイル サイズを超えました',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'クリックで編集',
	},
	KtFields: {
		optionalLabel: '任意',
		requiredMessage: 'このフィールドは必須です。',
	},
	KtFieldSelects: {
		loadingText: 'ロード中',
		noDataText: '結果がありません',
		noMatchText: 'データなし',
		placeholder: '選択してください',
	},
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
	KtNavbar: {
		menuCollapse: 'メニューを閉じる',
		menuExpand: '拡張メニュー',
		quickLinksTitle: 'クイックリンク',
	},
	KtStandardTable: {
		clearAll: 'Clear All',
		clearSelection: 'Clear Selection',
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
		notSet: '未設定',
	},
}
