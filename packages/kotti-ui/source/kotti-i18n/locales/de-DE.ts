import { KottiI18n } from '../types'

namespace Common {
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
}

export const deDE: KottiI18n.Messages = {
	KtBanner: {
		expandLabel: 'Öffnen',
		expandCloseLabel: 'Schließen',
	},
	KtComment: {
		deleteButton: 'Löschen',
		editButton: 'Bearbeiten',
		editedLabel: 'Bearbeitet',
		internalThreadLabel: 'Interner Beitrag',
		postButton: 'Beitragen',
		replyButton: 'Antworten',
		replyPlaceholder: 'Antwort an',
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
			review: 'Überprüfen',
			unknown: 'Unbekannt',
		},
		statusMsg: {
			CANCELED: 'Abgebrochen',
			ERROR: 'Hochladen fehlgeschlagen, bitte versuchen Sie es erneut',
			INVALID: 'Ungültig',
			NOT_STARTED: 'Nicht angefangen',
			UPLOADED: 'Hochgeladen',
			UPLOADED_WITH_ERROR: 'Hochgeladen mit Fehler',
			UPLOADING: 'Hochladen...',
			READY_TO_UPLOAD: 'Bereit zum Hochladen bei Einreichung',
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
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'Dieses Feld wird benötigt',
	},
	KtFieldSelects: {
		loadingText: 'Lädt',
		noMatchText: 'Nichts gefunden',
		noDataText: 'Keine Ergebnisse',
		placeholder: 'Daten wählen',
	},
	// TODO check KtFilters translations
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
}
