import type { KottiI18n } from '../types'

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

	export const restrictedAccess = 'Accès limité'
}

export const frFR: KottiI18n.Messages = {
	KtComment: {
		cancelMessage: 'Appuyez sur la touche Échap ou',
		clickToCancelLabel: 'cliquez pour annuler',
		deleteButton: 'Supprimer',
		editButton: 'Modifier',
		editedLabel: 'Modifié',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Publier',
		replyButton: 'Répondre',
		replyToLabel: 'Répondre à',
		unlockedHelpText: 'Visible par tous les utilisateurs',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: 'Utiliser la photo',
			cancel: 'Annuler',
			nextCamera: 'Appareil photo suivant',
			rejectPhoto: 'Reprendre la photo',
			retry: 'Réessayer',
			takePhoto: 'Prendre une photo',
		},
		error: {
			multipleNotAllowed:
				"Le téléchargement de plusieurs fichiers n'est pas autorisé",
			notAllowed: "L'autorisation d'accès à l'appareil photo a été refusée",
			notFound: 'Aucun appareil photo disponible trouvé',
			notSupported: 'Aucun appareil photo compatible trouvé',
		},
		label: {
			capture: 'Prendre une photo',
			error: 'Erreur',
			internal: Common.restrictedAccess,
			review: 'Examiner',
			unknown: 'Inconnu',
		},
		statusMsg: {
			CANCELED: 'Annulé',
			ERROR: 'Échec du téléchargement, veuillez réessayer',
			HIDDEN: '',
			INVALID: 'Non valide',
			NOT_STARTED: 'Pas commencé',
			READY_TO_UPLOAD: 'Prêt au téléchargement',
			UPLOADED: 'Téléchargement terminé',
			UPLOADED_WITH_ERROR: 'Téléchargement terminé avec une erreur',
			UPLOADING: 'Téléchargement en cours…',
		},
		text: {
			clickToUpload: 'Cliquer pour télécharger',
			dragAndDrop: 'or drag and drop your files here',
			learnMore: 'En savoir plus',
			max: 'max.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Format de fichier non pris en charge',
			MAX_SIZE_EXCEEDED:
				'La taille maximale autorisée pour un fichier est dépassée',
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
		loadingText: 'Chargement en cours',
		noDataText: 'Aucun résultat',
		noMatchText: 'Aucune donnée trouvée',
		placeholder: 'Sélectionner',
	},
	KtFilters: {
		addFilterLabel: 'Ajouter un filtre',
		andLabel: 'Et',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Tout effacer',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'est dans la période',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'Aucun filtre appliqué',
		filterLabel: 'Filtre',
		filtersLabel: 'Filtres',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: "est l'un de",
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
		unsetLabel: 'Ne plus définir',
		whereLabel: 'Où',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Erreurs',
		title: "L'envoi du formulaire n'est pas autorisé",
		warningsSectionTitle: 'Avertissements',
	},
	KtNavbar: {
		menuCollapse: 'Réduire le menu',
		menuExpand: 'Développer le menu',
		quickLinksTitle: 'Liens rapides',
	},
	KtStandardTable: {
		clearAll: 'Tout effacer',
		editColumns: 'Odifier les colonnes',
		editFilters: 'Modifier les filtres',
		endDate: 'Fin',
		itemsPerPage: 'Éléments par page',
		lastMonth: 'Le mois dernier',
		lastWeek: 'La semaine dernière',
		lastYear: "L'année dernière",
		max: 'Max.',
		min: 'Min.',
		moreThan: 'Plus de',
		resultsCounter:
			'Aucun élément | {range} de {total} élément | {range} de {total} éléments',
		search: 'Rechercher',
		selectionCount: '| {count} item selected | {count} items selected',
		showAll: 'Afficher tout',
		startDate: 'Début',
		today: "Aujourd'hui",
		upTo: "Jusqu'à",
	},
	KtTable: {
		no: 'Non',
		noItems: 'Aucun élément',
		yes: 'Oui',
	},
	KtValueLabel: {
		notSet: 'Non défini',
	},
}
