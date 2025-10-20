<template>
	<KtFieldText
		class="table-search"
		:dataTest="dataTest ? `${dataTest}.searchInput` : undefined"
		:isLoading="isLoading"
		isOptional
		:leftIcon="Yoco.Icon.SEARCH"
		:modelValue="internalValue"
		:placeholder="placeholder ?? translations.search"
		size="small"
		@update:modelValue="onInput"
	/>
</template>

<script lang="ts">
import debounce from 'lodash/debounce.js'
import { defineComponent, ref, watch } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { DEFAULT_DEBOUNCE } from '../../../constants'
import KtFieldText from '../../../kotti-field-text/KtFieldText.vue'
import type { KottiFieldText } from '../../../kotti-field-text/types'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'

export default defineComponent({
	name: 'TableSearch',
	components: {
		KtFieldText,
	},
	props: {
		dataTest: { default: null, type: String },
		isLoading: { default: false, type: Boolean },
		modelValue: { default: null, type: String },
		placeholder: { default: null, type: String },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const internalValue = ref<KottiFieldText.ModelValue>(null)

		const emitValue = debounce(() => {
			emit('update:modelValue', internalValue.value)
		}, DEFAULT_DEBOUNCE)

		watch(
			() => props.modelValue,
			(newValue) => {
				internalValue.value = newValue
			},
			{ immediate: true },
		)

		return {
			internalValue,
			onInput: (value: KottiFieldText.ModelValue) => {
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
