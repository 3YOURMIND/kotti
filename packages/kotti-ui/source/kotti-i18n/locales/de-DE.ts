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
		postButton: 'Beitragen',
		replyButton: 'Antworten',
		replyPlaceholder: 'Antwort an',
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
