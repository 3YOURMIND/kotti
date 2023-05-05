import { KottiI18n } from '../types'

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

export const frFR: KottiI18n.Messages = {
	KtBanner: {
		expandLabel: 'Voir',
		expandCloseLabel: 'Fermer',
	},
	KtComment: {
		deleteButton: 'Effacer',
		editButton: 'Modifier',
		editedLabel: 'Édité',
		internalThreadLabel: 'Filetage intérieur',
		postButton: 'Commenter',
		replyButton: 'Répondre',
		replyToLabel: 'Répondre à',
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
			review: 'Examen',
			unknown: 'Inconnue',
		},
		statusMsg: {
			CANCELED: 'Annulé',
			ERROR: 'Le téléchargement a échoué, veuillez réessayer',
			INVALID: 'Invalide',
			NOT_STARTED: 'Pas commencé',
			UPLOADED: 'Téléchargé',
			UPLOADED_WITH_ERROR: 'Téléchargé avec erreur',
			UPLOADING: 'Téléchargement...',
			READY_TO_UPLOAD: 'Prêt à être téléchargé',
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
	KtFields: {
		optionalLabel: 'Facultatif',
		requiredMessage: 'Ce champ est obligatoire',
	},
	KtFieldSelects: {
		loadingText: 'Chargement',
		noMatchText: 'Aucune correspondance',
		noDataText: 'Aucun résultat',
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
}
