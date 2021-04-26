/* eslint-disable sonarjs/no-duplicate-string */
import { KottiTranslation } from '../types'

export const esES: KottiTranslation.Messages = {
	KtFields: {
		optionalLabel: 'Opcional',
		requiredMessage: 'Este campo es requerido',
	},
	KtFieldSelects: {
		loadingText: 'Cargando',
		noMatchText: 'No hay datos que coincidan',
		noDataText: 'Sin datos',
		placeholder: 'Seleccionar',
	},
	KtFilter: {
		addFilterLabel: 'Agregar Filtro',
		andLabel: 'Y',
		boolean: {
			EQUAL: 'está',
			IS_EMPTY: 'está vacío',
		},
		clearAllLabel: 'Limpiar Todo',
		dateRange: {
			IN_RANGE: 'está en el rango',
			IS_EMPTY: 'está vacío',
		},
		disabledLabel: 'Deshabilitado',
		emptyListLabel: 'No hay Filtros Aplicados',
		enabledLabel: 'Habilitado',
		filterLabel: 'Filtro',
		filtersLabel: 'Filtros',
		multiEnum: {
			IS_EMPTY: 'está vacío',
			ONE_OF: 'es uno de',
		},
		number: {
			EQUAL: 'es igual a',
			GREATER_THAN: 'es mayor que',
			GREATER_THAN_OR_EQUAL: 'es mayor o igual a',
			IS_EMPTY: 'está vacío',
			LESS_THAN: 'es menor que',
			LESS_THAN_OR_EQUAL: 'es menor que o igual a',
		},
		searchLabel: 'Buscar',
		singleEnum: {
			EQUAL: 'es',
			IS_EMPTY: 'está vacío',
		},
		string: {
			CONTAINS: 'contiene',
			IS_EMPTY: 'está vacío',
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
