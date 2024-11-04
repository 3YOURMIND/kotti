<template>
	<KtFieldText
		class="table-search"
		:dataTest="dataTest ? `${dataTest}.searchInput` : undefined"
		:isLoading="isLoading"
		isOptional
		:leftIcon="Yoco.Icon.SEARCH"
		:placeholder="placeholder ?? translations.search"
		size="small"
		:value="internalValue"
		@input="onInput"
	/>
</template>

<script lang="ts">
import debounce from 'lodash/debounce'
import { defineComponent, ref, watch } from 'vue'
import { Yoco } from '@3yourmind/yoco'

import { DEFAULT_DEBOUNCE } from '../../constants'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import type { KottiFieldText } from '../../kotti-field-text/types'
import { makeProps } from '../../make-props'

import { KottiStandardTable } from '../types'

export default defineComponent({
	name: 'TableSearch',
	props: makeProps(KottiStandardTable.TableSearch.propsSchema),
	emits: ['input'],
	setup(props, { emit }) {
		const internalValue = ref<KottiFieldText.Value>(null)

		const emitValue = debounce(() => {
			emit('input', internalValue.value)
		}, DEFAULT_DEBOUNCE)

		watch(
			() => props.value,
			(newValue) => {
				internalValue.value = newValue
			},
			{ immediate: true },
		)

		return {
			internalValue,
			onInput: (value: KottiFieldText.Value) => {
				internalValue.value = value
				emitValue()
			},
			translations: useTranslationNamespace('KtStandardTable'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.table-search {
	flex: 1 1 auto;
	min-width: 8rem;
	max-width: 10rem;
	margin-bottom: 0;
}
</style>
