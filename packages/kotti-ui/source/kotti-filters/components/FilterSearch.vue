<template>
	<KtFieldText
		class="kt-filter__search"
		:dataTest="dataTest ? `${dataTest}.searchInput` : undefined"
		hideValidation
		:isLoading="isLoading"
		:leftIcon="Yoco.Icon.SEARCH"
		:placeholder="placeholder"
		size="small"
		:value="searchValue"
		@input="handleSetSearchValue"
	/>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { KtFieldText } from '../../kotti-field-text'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { KottiFilters } from '../types'
import { getSearchFilterInitialState } from '../utils'

export default defineComponent<{
	column: KottiFilters.Column.Search
	dataTest: string | null
	filter: KottiFilters.Filter | null
	isLoading: boolean
}>({
	name: 'FilterSearch',
	components: {
		KtFieldText,
	},
	props: {
		column: {
			required: true,
			type: Object,
		},
		dataTest: {
			default: null,
			type: String,
		},
		filter: {
			default: null,
			type: Object,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilters')

		const placeholder = computed<string>(
			() => props.column.placeholder ?? translations.value.searchLabel,
		)
		const searchValue = computed<KottiFilters.FilterValue>(
			() => props.filter?.value ?? null,
		)

		const handleSetSearchValue = (value: string) =>
			emit('input', {
				...(props.filter ?? getSearchFilterInitialState(props.column)),
				value,
			})

		return {
			handleSetSearchValue,
			placeholder,
			searchValue,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-filter__search {
	flex: 1;
	margin: 0 var(--unit-2) 0 0;
}
</style>
