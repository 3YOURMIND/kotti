import { KottiI18n } from '../types'

namespace Common {
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
}

export const esES: KottiI18n.Messages = {
	KtBanner: {
		expandLabel: 'Ver',
		expandCloseLabel: 'Cerrar',
	},
	KtComment: {
		deleteButton: 'Borrar',
		editButton: 'Editar',
		postButton: 'Publicar',
		replyButton: 'Responder',
		replyPlaceholder: 'Responder a',
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
}
