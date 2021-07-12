import { KottiTranslation } from '../types'

namespace Common {
	export const is = 'est'

	export const isEmpty = 'est vide'

	export const number = {
		EQUAL: 'est égal à',
		GREATER_THAN: 'est supérieur à',
		GREATER_THAN_OR_EQUAL: 'est supérieur ou égal à',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'est inférieur à',
		LESS_THAN_OR_EQUAL: 'est inférieur ou égal à',
	}
}

export const frFR: KottiTranslation.Messages = {
	KtBanner: {
		expandLabel: 'Voir',
		expandCloseLabel: 'Fermer',
	},
	KtFields: {
		optionalLabel: 'Facultatif',
		requiredMessage: 'Ce champ est obligatoire',
	},
	KtFieldSelects: {
		loadingText: 'Chargement',
		noMatchText: 'Aucune correspondance',
		noDataText: 'Aucune donnée',
		placeholder: 'Choisir',
	},
	KtFilters: {
		addFilterLabel: 'Ajouter un Filtre',
		andLabel: 'Et',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Tout Effacer',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'est à portée',
			IS_EMPTY: Common.isEmpty,
		},
		disabledLabel: 'Désactivé',
		emptyListLabel: 'Aucun Filtre Appliqué',
		enabledLabel: 'Activé',
		filterLabel: 'Filtre',
		filtersLabel: 'Filtres',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: 'fait partie de',
		},
		searchLabel: 'Rechercher',
		singleEnum: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		string: {
			CONTAINS: 'contient',
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		unsetLabel: 'Non défini',
		whereLabel: 'Où',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Erreurs',
		title: 'Soumission de formulaire non autorisée',
		warningsSectionTitle: 'Avertissements',
	},
	KtNavbar: {
		menuCollapse: 'Réduire le menu',
		menuExpand: 'Étendre le menu',
		quickLinksTitle: 'Liens Rapides',
	},
}
