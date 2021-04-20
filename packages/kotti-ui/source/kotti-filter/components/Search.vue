<template>
	<KtFieldText
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
import { KtFieldText } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'
import { getSearchFilterInitialState } from '../utils'

export default defineComponent<{
	column: Kotti.Filter.Column
	filter: Kotti.Filter.Filter | null
	isLoading: boolean
}>({
	name: 'Search',
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
		const translations = useTranslationNamespace('KtFilter')

		const placeholder = computed<string>(
			() => props.column?.placeholder ?? translations.value.searchLabel,
		)
		const searchValue = computed<Kotti.Filter.FilterValue>(
			() => props.filter?.value,
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
