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
import debounce from 'lodash/debounce.js'
import { defineComponent, ref, watch } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { DEFAULT_DEBOUNCE } from '../../../constants'
import type { KottiFieldText } from '../../../kotti-field-text/types'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'

export default defineComponent({
	name: 'TableSearch',
	props: {
		dataTest: { default: null, type: String },
		isLoading: { default: false, type: Boolean },
		placeholder: { default: null, type: String },
		value: { default: null, type: String },
	},
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
