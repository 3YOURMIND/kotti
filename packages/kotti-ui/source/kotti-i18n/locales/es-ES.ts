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
		LESS_THAN_OR_EQUAL: 'es menor o igual a',
	}

	export const restrictedAccess = 'Acceso restringido'
}

export const esES: KottiI18n.Messages = {
	KtComment: {
		cancelMessage: 'Pulse la tecla Esc o',
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
			rejectPhoto: 'Volver a tomar Foto',
			retry: 'Reintentar',
			takePhoto: 'Tomar Foto',
		},
		error: {
			multipleNotAllowed: 'No se permite cargar múltiples archivos',
			notAllowed: 'Permiso denegado para usar la cámara',
			notFound: 'No se ha encontrado ninguna cámara disponible',
			notSupported: 'No se ha encontrado ninguna cámara compatible',
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
			ERROR: 'Carga fallida, por favor inténtelo de nuevo',
			HIDDEN: '',
			INVALID: 'Inválido',
			NOT_STARTED: 'No iniciado',
			READY_TO_UPLOAD: 'Listo para cargar en el envío',
			UPLOADED: 'Cargado',
			UPLOADED_WITH_ERROR: 'Cargado con error',
			UPLOADING: 'Cargando...',
		},
		text: {
			clickToUpload: 'Haga clic para cargar',
			dragAndDrop: 'o arrastre y suelte',
			learnMore: 'Más información',
			max: 'máx.',
		},
		validationMsg: {
			INVALID_EXTENSION: 'Formato de archivo no compatible',
			MAX_SIZE_EXCEEDED: 'Se ha excedido el tamaño máximo de archivo permitido',
		},
	},
	KtFieldInlineEdit: {
		placeholder: 'Haga clic para editar',
	},
	KtFields: {
		optionalLabel: 'Opcional',
		requiredMessage: 'Este campo es obligatorio',
	},
	KtFieldSelects: {
		loadingText: 'Cargando',
		noDataText: 'Sin resultados',
		noMatchText: 'No hay datos que coincidan',
		placeholder: 'Seleccionar',
	},
	KtFilters: {
		addFilterLabel: 'Añadir Filtro',
		andLabel: 'Y',
		boolean: {
			EQUAL: Common.is,
			IS_EMPTY: Common.isEmpty,
		},
		clearAllLabel: 'Borrar Todo',
		currency: Common.number,
		dateRange: {
			IN_RANGE: 'está en el rango',
			IS_EMPTY: Common.isEmpty,
		},
		emptyListLabel: 'No se han aplicado filtros',
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
		unsetLabel: 'No establecido',
		whereLabel: 'Dónde',
	},
	KtFormSubmit: {
		errorsSectionTitle: 'Errores',
		title: 'Envío de formulario no permitido',
		warningsSectionTitle: 'Advertencias',
	},
	KtNavbar: {
		menuCollapse: 'Contraer el menú',
		menuExpand: 'Expandir el menú',
		quickLinksTitle: 'Enlaces rápidos',
	},
	KtStandardTable: {
		clearAll: 'Despejar todo',
		editColumns: 'Editar columnas',
		editFilters: 'Editar filtros',
		endDate: 'Finalización',
		itemsPerPage: 'Artículos por página',
		lastMonth: 'Mes pasado',
		lastWeek: 'Semana pasada',
		lastYear: 'Año pasado',
		max: 'Máx.',
		min: 'Mín.',
		moreThan: 'Más de',
		resultsCounter:
			'No hay artículos | {range} de {total} artículo | {range} de {total} artículos',
		search: 'Buscar',
		showAll: 'Mostrar todo',
		startDate: 'Inicio',
		today: 'Hoy',
		upTo: 'Hasta',
	},
	KtTable: {
		no: 'No',
		noItems: 'No hay artículos',
		yes: 'Yes',
	},
	KtValueLabel: {
		notSet: 'No Establecido',
	},
}
