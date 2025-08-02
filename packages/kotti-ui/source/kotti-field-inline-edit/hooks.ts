import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, watch } from 'vue'

import type { KottiField } from '../kotti-field/types'
import type { Nullable } from '../types/utilities'

import type { FieldInlineEditElement } from './types'
import { KottiFieldInlineEdit } from './types'
import { resizeField } from './utils'

export const useAdjustHeight = ({
	field,
	inputRef: _inputRef,
	props,
}: {
	field: KottiField.Hook.Returns<KottiFieldInlineEdit.ModelValue>
	inputRef: Ref<Nullable<FieldInlineEditElement>>
	props: KottiFieldInlineEdit.PropsInternal
}): void => {
	const inputRef = _inputRef
	const currentValue = computed(() => field.currentValue)

	onMounted(() => {
		if (inputRef.value) void resizeField({ inputRef: inputRef.value })
	})

	watch(
		() => [
			currentValue.value,
			inputRef.value,
			props.isLoading,
			props.placeholder,
			props.textStyle,
		],
		() => {
			if (inputRef.value) void resizeField({ inputRef: inputRef.value })
		},
		{ immediate: true },
	)
}

export const usePreventConfirm = ({
	field,
	props,
}: {
	field: KottiField.Hook.Returns<KottiFieldInlineEdit.ModelValue>
	props: KottiFieldInlineEdit.PropsInternal
}): {
	preventConfirm: ComputedRef<boolean>
} => {
	const fieldValidation = computed(() => field.validation.type)

	const preventConfirm = computed<boolean>(() => {
		switch (props.preventConfirmationOn) {
			case KottiFieldInlineEdit.ConfirmationValidation.ERROR:
				return fieldValidation.value === 'error'
			case KottiFieldInlineEdit.ConfirmationValidation.NEVER:
				return false
			case KottiFieldInlineEdit.ConfirmationValidation.WARNING:
				return ['error', 'warning'].includes(fieldValidation.value)
			default:
				throw new Error(
					`KtFieldInlineEdit: Unexpected type for 'preventConfirmationOn': ${props.preventConfirmationOn}`,
				)
		}
	})

	return {
		preventConfirm,
	}
}
