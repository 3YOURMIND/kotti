import type { KottiI18n } from '../types'

module Common {
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

	export const restrictedAccess = 'Accès restreint'
}

export const frFR: KottiI18n.Messages = {
	KtComment: {
		cancelMessage: 'Appuyez sur la touche Esc ou',
		clickToCancelLabel: 'cliquez pour annuler',
		deleteButton: 'Effacer',
		editButton: 'Modifier',
		editedLabel: 'Édité',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Commenter',
		replyButton: 'Répondre',
		replyToLabel: 'Répondre à',
		unlockedHelpText: 'Visible par tous les utilisateurs',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: 'Utiliser la Photo',
			cancel: 'Annuler',
			nextCamera: 'Caméra Suivante',
			rejectPhoto: 'Reprendre la Photo',
			retry: 'Recommencer',
			takePhoto: 'Prendre une Photo',
		},
		error: {
			multipleNotAllowed: 'Téléchargement de plusieurs fichiers non autorisé',
			notAllowed: "Autorisation refusée d'utiliser la caméra",
			notFound: 'Aucune caméra disponible trouvée',
			notSupported: 'Aucune caméra compatible trouvée',
		},
		label: {
			capture: 'Prendre une Photo',
			error: 'Erreur',
			internal: Common.restrictedAccess,
			review: 'Examen',
			unknown: 'Inconnue',
		},
		statusMsg: {
			CANCELED: 'Annulé',
			ERROR: 'Le téléchargement a échoué, veuillez réessayer',
			HIDDEN: '',
			INVALID: 'Invalide',
			NOT_STARTED: 'Pas commencé',
			READY_TO_UPLOAD: 'Prêt à être téléchargé',
			UPLOADED: 'Téléchargé',
			UPLOADED_WITH_ERROR: 'Téléchargé avec erreur',
			UPLOADING: 'Téléchargement...',
		},
		text: {
			clickToUpload: 'Cliquer pour télécharger',
			dragAndDrop: 'ou glisser-déposer',
			learnMore: 'En savoir plus',
			max: 'max.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Format de fichier non pris en charge',
			MAX_SIZE_EXCEEDED: 'Taille de fichier maximale autorisée dépassée',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Cliquez pour modifier',
	},
	KtFields: {
		optionalLabel: 'Facultatif',
		requiredMessage: 'Ce champ est obligatoire',
	},
	KtFieldSelects: {
		loadingText: 'Chargement',
		noDataText: 'Aucun résultat',
		noMatchText: 'Aucune correspondance',
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
		emptyListLabel: 'Aucun Filtre Appliqué',
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
	KtStandardTable: {
		clearAll: 'Clear All',
		editColumns: 'Edit Columns',
		editFilters: 'Edit Filters',
		endDate: 'End',
		lastMonth: 'Last Month',
		lastWeek: 'Last Week',
		lastYear: 'Last Year',
		max: 'Max.',
		min: 'Min.',
		moreThan: 'More Than',
		resultsCounter:
			'No items | {range} of {total} item | {range} of {total} items',
		rowsPerPage: 'Rows per page',
		search: 'Search',
		showAll: 'Show All',
		startDate: 'Start',
		today: 'Today',
		upTo: 'Up To',
	},
	KtTable: {
		no: 'No',
		noItems: 'No Data',
		yes: 'Yes',
	},
	KtValueLabel: {
		notSet: 'Non définie',
	},
}
