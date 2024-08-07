import type { KottiI18n } from '../types'

module Common {
	export const is = 'es'

	export const isEmpty = 'está vacío'

	export const number = {
		EQUAL: 'es igual a',
		GREATER_THAN: 'es mayor que',
		GREATER_THAN_OR_EQUAL: 'es mayor o igual a',
		IS_EMPTY: Common.isEmpty,
		LESS_THAN: 'es menor que',
		LESS_THAN_OR_EQUAL: 'es menor que o igual a',
	}

	export const restrictedAccess = 'Acceso restringido'
}

export const esES: KottiI18n.Messages = {
	KtBanner: {
		expandLabel: 'Ver',
		expandCloseLabel: 'Cerrar',
	},
	KtComment: {
		cancelMessage: 'Presione la tecla Esc o',
		clickToCancelLabel: 'haga clic para cancelar',
		deleteButton: 'Borrar',
		editButton: 'Editar',
		editedLabel: 'Editado',
		internalLabel: Common.restrictedAccess,
		lockedHelpText: Common.restrictedAccess,
		postButton: 'Publicar',
		replyButton: 'Responder',
		replyToLabel: 'Responder a',
		unlockedHelpText: 'Visible para todos los usuarios',
	},
	KtFieldFileUpload: {
		button: {
			acceptPhoto: 'Usar Foto',
			cancel: 'Cancelar',
			nextCamera: 'Siguiente Cámara',
			rejectPhoto: 'Retomar Foto',
			retry: 'Reintentar',
			takePhoto: 'Tomar Foto',
		},
		error: {
			multipleNotAllowed: 'Carga de múltiples archivos no permitida',
			notAllowed: 'Permiso denegado para usar la cámara',
			notFound: 'No se encontró ninguna cámara disponible',
			notSupported: 'No se encontró ninguna cámara compatible',
		},
		label: {
			capture: 'Tomar Foto',
			error: 'Error',
			internal: Common.restrictedAccess,
			review: 'Revisar',
			unknown: 'Desconocido',
		},
		statusMsg: {
			CANCELED: 'Cancelado',
			ERROR: 'La carga falló, por favor intente nuevamente',
			HIDDEN: '',
			INVALID: 'Inválido',
			NOT_STARTED: 'No iniciado',
			UPLOADED: 'Cargado',
			UPLOADED_WITH_ERROR: 'Cargado con error',
			UPLOADING: 'Cargando...',
			READY_TO_UPLOAD: 'Listo para cargar en el envío',
		},
		text: {
			clickToUpload: 'Haga clic para cargar',
			dragAndDrop: 'o arrastre y suelte',
			learnMore: 'Aprender más',
			max: 'máx.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Formato de archivo no soportado',
			MAX_SIZE_EXCEEDED: 'Tamaño máximo de archivo permitido excedido',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Haga clic para editar',
	},
	KtFields: {
		optionalLabel: 'Opcional',
		requiredMessage: 'Este campo es requerido',
	},
	KtFieldSelects: {
		loadingText: 'Cargando',
		noMatchText: 'No hay datos que coincidan',
		noDataText: 'Sin resultados',
		placeholder: 'Seleccionar',
	},
	KtFilters: {
		addFilterLabel: 'Agregar Filtro',
		andLabel: 'Y',
		boolean: {
			EQUAL: 'está',
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Limpiar Todo',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'está en el rango',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'No hay Filtros Aplicados',
		filterLabel: 'Filtro',
		filtersLabel: 'Filtros',
		float: Common.number,
		integer: Common.number,
		multiEnum: {
			IS_EMPTY: Common.isEmpty,
			ONE_OF: 'es uno de',
		},
		searchLabel: 'Buscar',
		singleEnum: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		string: {
			CONTAINS: 'contiene',
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		unsetLabel: 'No Establecido',
		whereLabel: 'Donde',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Errores',
		title: 'Envío de formulario no permitido',
		warningsSectionTitle: 'Avisos',
	},
	KtNavbar: {
		menuCollapse: 'Colapsar menú',
		menuExpand: 'Expandir el menú',
		quickLinksTitle: 'Enlaces rápidos',
	},
	KtValueLabel: {
		notSet: 'No establecido',
	},
}
