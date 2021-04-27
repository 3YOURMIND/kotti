import { KottiTranslation } from '../types'

export const deDE: KottiTranslation.Messages = {
	KtFields: {
		optionalLabel: 'Optional',
		requiredMessage: 'Dieses Feld wird benötigt',
	},
	KtFieldSelects: {
		loadingText: 'Lädt',
		noMatchText: 'Nichts gefunden',
		noDataText: 'Keine Daten',
		placeholder: 'Daten wählen',
	},
	// TODO check KtFilters translations
	KtFilters: {
		addFilterLabel: 'Filter Hinzufügen',
		andLabel: 'Und',
		boolean: {
			EQUAL: 'ist',
			IS_EMPTY: 'ist leer',
		},
		clearAllLabel: 'Alles Löschen',
		dateRange: {
			IN_RANGE: 'ist in Reichweite',
			IS_EMPTY: 'ist leer',
		},
		disabledLabel: 'Deaktiviert',
		emptyListLabel: 'Keine Filter Angewendet',
		enabledLabel: 'Aktiviert',
		filterLabel: 'Filter',
		filtersLabel: 'Filter',
		multiEnum: {
			IS_EMPTY: 'ist leer',
			ONE_OF: 'ist einer von',
		},
		number: {
			EQUAL: 'gleich',
			GREATER_THAN: 'ist größer als',
			GREATER_THAN_OR_EQUAL: 'ist größer oder gleich',
			IS_EMPTY: 'ist leer',
			LESS_THAN: 'ist kleiner als',
			LESS_THAN_OR_EQUAL: 'ist kleiner oder gleich',
		},
		searchLabel: 'Suche',
		singleEnum: {
			EQUAL: 'ist',
			IS_EMPTY: 'ist leer',
		},
		string: {
			CONTAINS: 'enthält',
			IS_EMPTY: 'ist leer',
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
