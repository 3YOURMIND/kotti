<template>
	<KtFieldText
		class="search-input"
		:dataTest="dataTest"
		:isLoading="isLoading"
		isOptional
		:leftIcon="Yoco.Icon.SEARCH"
		:modelValue="internalValue"
		:placeholder="placeholder"
		:size="size"
		@update:modelValue="onInput"
	/>
</template>

<script lang="ts">
import debounce from 'lodash/debounce.js'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { DEFAULT_DEBOUNCE } from '../../constants'
import KtFieldText from '../../kotti-field-text/KtFieldText.vue'
import type { KottiFieldText } from '../../kotti-field-text/types'
import { KottiField } from '../../kotti-field/types'

export default defineComponent({
	name: 'SearchInput',
	components: {
		KtFieldText,
	},
	props: {
		dataTest: { required: false, type: String },
		isLoading: { default: false, type: Boolean },
		modelValue: { default: null, type: String },
		placeholder: { required: false, type: String },
		size: {
			default: KottiField.Size.MEDIUM,
			type: String as PropType<KottiField.Size>,
		},
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
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.search-input {
	margin-bottom: 0;
}
</style>
