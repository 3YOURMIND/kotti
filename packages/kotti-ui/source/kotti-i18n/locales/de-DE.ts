import type { KottiI18n } from '../types'

namespace Common {
	export const is = 'ist'

	export const isEmpty = 'ist leer'

	export const number = {
		EQUAL: 'ist gleich',
		GREATER_THAN: 'ist größer als',
		GREATER_THAN_OR_EQUAL: 'ist größer als oder gleich',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'ist weniger als',
		LESS_THAN_OR_EQUAL: 'ist weniger als oder gleich',
	}

	export const restrictedAccess = 'Eingeschränkter Zugriff'
}

export const deDE: KottiI18n.Messages = {
	KtColumnSelector: {
		availableColumns: 'Available Columns',
		columns: 'Columns',
		searchColumn: 'Search Column',
		visibleColumns: 'Visible Columns',
	},
	KtComment: {
		cancelMessage: 'Esc drücken oder',
		clickToCancelLabel: 'klicken, um abzubrechen',
		deleteButton: 'Löschen',
		editButton: 'Bearbeiten',
		editedLabel: 'Bearbeitet',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Posten',
		replyButton: 'Antworten',
		replyToLabel: 'Antwort an',
		unlockedHelpText: 'Für alle Nutzer sichtbar',
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
			acceptPhoto: 'Foto verwenden',
			cancel: 'Abbrechen',
			nextCamera: 'Nächste Kamera',
			rejectPhoto: 'Foto erneut aufnehmen',
			retry: 'Erneut versuchen',
			takePhoto: 'Foto aufnehmen',
		},
		error: {
			multipleNotAllowed: 'Hochladen mehrerer Dateien nicht erlaubt',
			notAllowed: 'Zugriff auf die Kamera verweigert',
			notFound: 'Es konnte keine Kamera gefunden werden',
			notSupported: 'Es konnte keine kompatible Kamera gefunden werden',
		},
		label: {
			capture: 'Foto aufnehmen',
			error: 'Fehler',
			internal: Common.restrictedAccess,
			review: 'Überprüfen',
			unknown: 'Unbekannt',
		},
		statusMsg: {
			CANCELED: 'Abgebrochen',
			ERROR: 'Upload fehlgeschlagen, bitte versuchen Sie es erneut',
			HIDDEN: '',
			INVALID: 'Ungültig',
			NOT_STARTED: 'Nicht angefangen',
			READY_TO_UPLOAD: 'Bereit zum Hochladen',
			UPLOADED: 'Hochgeladen',
			UPLOADED_WITH_ERROR: 'Mit Fehler hochgeladen',
			UPLOADING: 'Wird hochgeladen …',
		},
		text: {
			clickToUpload: 'Zum Hochladen klicken',
			dragAndDrop: 'or drag and drop your files here',
			learnMore: 'Mehr erfahren',
			max: 'max.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Nicht unterstütztes Dateiformat',
			MAX_SIZE_EXCEEDED: 'Maximal zulässige Dateigröße überschritten',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Zum Bearbeiten klicken',
	},
	KtFields: {
		requiredMessage: 'Dieses Feld ist erforderlich',
	},
	KtFieldSelects: {
		loadingText: 'Wird geladen',
		noDataText: 'Keine Ergebnisse',
		noMatchText: 'Keine passenden Daten',
		placeholder: 'Auswählen',
	},
	KtFilters: {
		addFilterLabel: 'Filter hinzufügen',
		andLabel: 'Und',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Alles löschen',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'ist im Bereich',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'Keine Filter angewendet',
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
		unsetLabel: 'Einstellung aufheben',
		whereLabel: 'Wo',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Fehler',
		title: 'Formularübertragung nicht erlaubt',
		warningsSectionTitle: 'Warnungen',
	},
	KtNavbar: {
		menuCollapse: 'Menü einklappen',
		menuExpand: 'Menü ausklappen',
		quickLinksTitle: 'Kurzlinks',
	},
	KtStandardTable: {
		clearAll: 'Alles löschen',
		endDate: 'Ende',
		filters: 'Filter',
		itemsPerPage: 'Elemente pro Seite',
		lastMonth: 'Letzter Monat',
		lastWeek: 'Letzte Woche',
		lastYear: 'Letztes Jahr',
		max: 'Max.',
		min: 'Min.',
		moreThan: 'Mehr als',
		resultsCounter:
			'Keine Elemente | {range} von {total} Element | {range} von {total} Elementen',
		search: 'Suche',
		selectionCount: '| {count} Element ausgewählt | {count} items ausgewählt',
		showAll: 'Alles anzeigen',
		startDate: 'Start',
		today: 'Heute',
		upTo: 'Bis zu',
	},
	KtTable: {
		no: 'Nein',
		noItems: 'Keine Elemente',
		yes: 'Ja',
	},
	KtValueLabel: {
		notSet: 'Nicht festgelegt',
	},
}
