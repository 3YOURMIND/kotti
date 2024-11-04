import type { KottiI18n } from '../types'

module Common {
	export const is = 'ist'

	export const isEmpty = 'ist leer'

	export const number = {
		EQUAL: 'gleich',
		GREATER_THAN: 'ist größer als',
		GREATER_THAN_OR_EQUAL: 'ist größer oder gleich',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'ist kleiner als',
		LESS_THAN_OR_EQUAL: 'ist kleiner oder gleich',
	}

	export const restrictedAccess = 'Eingeschränkter Zugang'
}

export const deDE: KottiI18n.Messages = {
	KtBanner: {
		expandCloseLabel: 'Schließen',
		expandLabel: 'Öffnen',
	},
	KtComment: {
		cancelMessage: 'Drücken Sie die Esc-Taste oder',
		clickToCancelLabel: 'klicken Sie zum Abbrechen',
		deleteButton: 'Löschen',
		editButton: 'Bearbeiten',
		editedLabel: 'Bearbeitet',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Beitragen',
		replyButton: 'Antworten',
		replyToLabel: 'Antwort an',
		unlockedHelpText: 'Für alle Benutzer sichtbar',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: 'Foto verwenden',
			cancel: 'Absagen',
			nextCamera: 'Nächste Kamera',
			rejectPhoto: 'Foto wiederholen',
			retry: 'Wiederholen',
			takePhoto: 'Foto machen',
		},
		error: {
			multipleNotAllowed: 'Das Hochladen mehrerer Dateien ist nicht zulässig',
			notAllowed: 'Die Erlaubnis zur Verwendung der Kamera wurde verweigert',
			notFound: 'Keine verfügbare Kamera gefunden',
			notSupported: 'Keine kompatible Kamera verfügbar',
		},
		label: {
			capture: 'Foto machen',
			error: 'Error',
			internal: Common.restrictedAccess,
			review: 'Überprüfen',
			unknown: 'Unbekannt',
		},
		statusMsg: {
			CANCELED: 'Abgebrochen',
			ERROR: 'Hochladen fehlgeschlagen, bitte versuchen Sie es erneut',
			HIDDEN: '',
			INVALID: 'Ungültig',
			NOT_STARTED: 'Nicht angefangen',
			READY_TO_UPLOAD: 'Bereit zum Hochladen bei Einreichung',
			UPLOADED: 'Hochgeladen',
			UPLOADED_WITH_ERROR: 'Hochgeladen mit Fehler',
			UPLOADING: 'Hochladen...',
		},
		text: {
			clickToUpload: 'Zum Hochladen klicken',
			dragAndDrop: 'oder ziehen und ablegen',
			learnMore: 'Mehr erfahren',
			max: 'max.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Dateiformat nicht unterstützt',
			MAX_SIZE_EXCEEDED: 'Maximal zulässige Dateigröße überschritten',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Zum Bearbeiten klicken',
	},
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'Dieses Feld wird benötigt',
	},
	KtFieldSelects: {
		loadingText: 'Lädt',
		noDataText: 'Keine Ergebnisse',
		noMatchText: 'Nichts gefunden',
		placeholder: 'Daten wählen',
	},
	KtFilters: {
		addFilterLabel: 'Filter Hinzufügen',
		andLabel: 'Und',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Alles Löschen',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'ist in Reichweite',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'Keine Filter Angewendet',
		filterLabel: 'Filter',
		filtersLabel: 'Filter',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: 'ist einer von',
		},
		searchLabel: 'Suche',
		singleEnum: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		string: {
			CONTAINS: 'enthält',
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		unsetLabel: 'Nicht Eingestellt',
		whereLabel: 'Wo',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Fehler',
		title: 'Formularübermittlung nicht zulässig',
		warningsSectionTitle: 'Warnungen',
	},
	KtNavbar: {
		menuCollapse: 'Menü ausblenden',
		menuExpand: 'Menü einblenden',
		quickLinksTitle: 'Schnellzugriff',
	},
	KtStandardTable: {
		clearAll: 'Clear All',
		editColumns: 'Edit Columns',
		editFilters: 'Edit Filters',
		endDate: 'End',
		lastMonth: 'Last Month',
		lastWeek: 'Last Week',
		lastYear: 'LastYear',
		max: 'Max.',
		min: 'Min.',
		moreThan: 'More than',
		resultsCounter:
			'No items | {range} of {total} item | {range} of {total} items',
		rowsPerPage: 'Rows per page',
		search: 'Search',
		showAll: 'Show All',
		startDate: 'Start',
		today: 'Today',
		upTo: 'Up to',
	},
	KtValueLabel: {
		notSet: 'Nicht festgelegt',
	},
}
