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
	// TODO check KtFilter translations
	KtFilter: {
		addFilterLabel: 'Filter Hinzufügen',
		andLabel: 'Und',
		boolean: {
			EQUAL: 'ist',
		},
		clearAllLabel: 'Alles Löschen',
		common: {
			IS_EMPTY: 'ist leer',
		},
		dateRange: {
			IN_RANGE: 'ist in Reichweite',
		},
		disabledLabel: 'Deaktiviert',
		emptyListLabel: 'Keine Filter Angewendet',
		enabledLabel: 'Aktiviert',
		filterLabel: 'Filter',
		filtersLabel: 'Filter',
		multiEnum: {
			ONE_OF: 'ist einer von',
		},
		number: {
			EQUAL: 'gleich',
			GREATER_THAN: 'ist größer als',
			GREATER_THAN_OR_EQUAL: 'ist größer oder gleich',
			LESS_THAN: 'ist kleiner als',
			LESS_THAN_OR_EQUAL: 'ist kleiner oder gleich',
		},
		searchLabel: 'Suche',
		singleEnum: {
			EQUAL: 'ist',
		},
		string: {
			CONTAINS: 'enthält',
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
