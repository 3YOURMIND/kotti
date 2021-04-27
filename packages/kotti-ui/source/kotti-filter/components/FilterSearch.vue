<template>
	<KtFieldText
		class="kt-filter__search"
		hideValidation
		:isLoading="isLoading"
		:leftIcon="Yoco.Icon.SEARCH"
		:placeholder="placeholder"
		:size="Kotti.Field.Size.SMALL"
		:value="searchValue"
		@input="handleSetSearchValue"
	/>
</template>

<script lang="ts">
import { KtFieldText } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'
import { getSearchFilterInitialState } from '../utils'

export default defineComponent<{
	column: Kotti.Filters.Column.Search
	filter: Kotti.Filters.Filter | null
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
		const searchValue = computed<Kotti.Filters.FilterValue>(
			() => props.filter?.value,
		)

		const handleSetSearchValue = (value: string) =>
			emit('input', {
				...(props.filter ?? getSearchFilterInitialState(props.column)),
				value,
			})

		return {
			handleSetSearchValue,
			Kotti,
			placeholder,
			searchValue,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter__search {
	flex: 1;
	margin: 0 $unit-2 0 0;
}
</style>
