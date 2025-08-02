<template>
	<KtFieldText
		class="kt-filter__search"
		:dataTest="dataTest ? `${dataTest}.searchInput` : undefined"
		hideValidation
		:isLoading="isLoading"
		:leftIcon="Yoco.Icon.SEARCH"
		:modelValue="searchValue"
		:placeholder="placeholder"
		size="small"
		@update:modelValue="handleSetSearchValue"
	/>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { KtFieldText } from '../../kotti-field-text'
import type { KottiFieldText } from '../../kotti-field-text/types'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import type { KottiFilters } from '../types'
import { getSearchFilterInitialState } from '../utils'

export default defineComponent({
	name: 'FilterSearch',
	components: {
		KtFieldText,
	},
	props: {
		column: {
			required: true,
			type: Object as PropType<KottiFilters.Column.Search>,
		},
		dataTest: {
			default: null,
			type: String,
		},
		filter: {
			default: null,
			type: Object as PropType<KottiFilters.InternalFilterSearch | null>,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilters')

		const handleSetSearchValue = (value: string) => {
			emit('update:modelValue', {
				...(props.filter ?? getSearchFilterInitialState(props.column)),
				value,
			})
		}

		return {
			handleSetSearchValue,
			placeholder: computed<string>(
				() => props.column.placeholder ?? translations.value.searchLabel,
			),
			searchValue: computed<KottiFieldText.ModelValue>(
				() => props.filter?.value ?? null,
			),
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
