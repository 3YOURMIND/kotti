import type { KottiI18n } from '../types'

namespace Common {
	export const is = 'є'

	export const isEmpty = 'порожнє'

	export const number = {
		EQUAL: 'дорівнює',
		GREATER_THAN: 'більше ніж',
		GREATER_THAN_OR_EQUAL: 'більше або дорівнює',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'менше ніж',
		LESS_THAN_OR_EQUAL: 'менше або дорівнює',
	}

	export const restrictedAccess = 'Доступ обмежено'
}

export const ukUA: KottiI18n.Messages = {
	KtComment: {
		cancelMessage: 'Натисніть Esc або',
		clickToCancelLabel: 'натисніть, щоб скасувати',
		deleteButton: 'Видалити',
		editButton: 'Редагувати',
		editedLabel: 'Відредаговано',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Опублікувати',
		replyButton: 'Відповісти',
		replyToLabel: 'Відповісти',
		unlockedHelpText: 'Видимий для всіх користувачів',
	},
	KtFieldDateShared: {
		cancelButton: 'Cancel',
		confirmButton: 'OK',
		hours: 'hours',
		minutes: 'minutes',
		seconds: 'seconds',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: 'Використати фото',
			cancel: 'Скасувати',
			nextCamera: 'Наступна камера',
			rejectPhoto: 'Повторити фото',
			retry: 'Повторити',
			takePhoto: 'Зробити фото',
		},
		error: {
			multipleNotAllowed: 'Мультизавантаження не дозволено',
			notAllowed: 'Доступ до камери заборонений',
			notFound: 'Камеру не знайдено',
			notSupported: 'Сумісна камера не знайдена',
		},
		label: {
			capture: 'Зробити фото',
			error: 'Помилка',
			internal: Common.restrictedAccess,
			review: 'Перегляд',
			unknown: 'Невідомо',
		},
		statusMsg: {
			CANCELED: 'Скасовано',
			ERROR: 'Не вдалося завантажити, спробуйте ще раз',
			HIDDEN: '',
			INVALID: 'Недійсний',
			NOT_STARTED: 'Не розпочато',
			READY_TO_UPLOAD: 'Готово до завантаження',
			UPLOADED: 'Завантажено',
			UPLOADED_WITH_ERROR: 'Завантажено з помилкою',
			UPLOADING: 'Завантаження...',
		},
		text: {
			clickToUpload: 'Натисніть для завантаження',
			dragAndDrop: 'або перетягніть файли сюди',
			learnMore: 'Дізнатися більше',
			max: 'макс.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Формат файлу не підтримується',
			MAX_SIZE_EXCEEDED: 'Перевищено макс. дозволений розмір файлу',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Натисніть для редагування',
	},
	KtFields: {
		requiredMessage: "Це поле є обов'язковим",
	},
	KtFieldSelects: {
		loadingText: 'Завантаження',
		noDataText: 'Немає результатів',
		noMatchText: 'Даних не знайдено',
		placeholder: 'Вибрати',
	},
	KtFilters: {
		addFilterLabel: 'Додати фільтр',
		andLabel: 'І',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Очистити все',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'у діапазоні',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'Фільтри не застосовано',
		filterLabel: 'Фільтр',
		filtersLabel: 'Фільтри',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: 'є одним з',
		},
		searchLabel: 'Пошук',
		singleEnum: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		string: {
			CONTAINS: 'містить',
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		unsetLabel: 'Скинути',
		whereLabel: 'Де',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Помилки',
		title: 'Надсилання форми заборонено',
		warningsSectionTitle: 'Попередження',
	},
	KtNavbar: {
		menuCollapse: 'Згорнути меню',
		menuExpand: 'Розгорнути меню',
		quickLinksTitle: 'Швидкі посилання',
	},
	KtStandardTable: {
		clearAll: 'Очистити все',
		editColumns: 'Редагувати колонки',
		editFilters: 'Редагувати фільтри',
		endDate: 'Кінець',
		itemsPerPage: 'Елементів на сторінці',
		lastMonth: 'Минулий місяць',
		lastWeek: 'Минулий тиждень',
		lastYear: 'Минулий рік',
		max: 'Макс.',
		min: 'Мін.',
		moreThan: 'Більше ніж',
		resultsCounter:
			'Немає елементів | {range} з {total} елемента | {range} з {total} елементів',
		search: 'Пошук',
		selectionCount: '| {count} Element ausgewählt | {count} items ausgewählt',
		showAll: 'Показати все',
		startDate: 'Початок',
		today: 'Сьогодні',
		upTo: 'До',
	},
	KtTable: {
		no: 'Ні',
		noItems: 'Немає елементів',
		yes: 'Так',
	},
	KtValueLabel: {
		notSet: 'Не встановлено',
	},
}
