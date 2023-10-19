import { Ref, computed, onMounted, watch } from '@vue/composition-api'

import { KottiField } from '../kotti-field/types'
import { Nullable } from '../types/utilities'

import { FieldInlineEditElement, KottiFieldInlineEdit } from './types'
import { resizeField } from './utils'

export const useAdjustHeight = ({
	field,
	inputRef: _inputRef,
	props,
}: {
	field: KottiField.Hook.Returns<KottiFieldInlineEdit.Value>
	inputRef: Ref<Nullable<FieldInlineEditElement>>
	props: KottiFieldInlineEdit.PropsInternal
}) => {
	const inputRef = _inputRef
	const currentValue = computed(() => field.currentValue)

	onMounted(() => {
		if (inputRef.value) resizeField({ inputRef: inputRef.value })
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
			if (inputRef.value) resizeField({ inputRef: inputRef.value })
		},
		{ immediate: true },
	)
}

export const usePreventConfirm = ({
	field,
	props,
}: {
	field: KottiField.Hook.Returns<KottiFieldInlineEdit.Value>
	props: KottiFieldInlineEdit.PropsInternal
}) => {
	const fieldValidation = computed(() => field.validation.type)

	const preventConfirm = computed<boolean>(() => {
		switch (props.preventConfirmationOn) {
			case KottiFieldInlineEdit.ConfirmationValidation.ERROR:
				return fieldValidation.value === 'error'
			case KottiFieldInlineEdit.ConfirmationValidation.WARNING:
				return ['error', 'warning'].includes(fieldValidation.value)
			case KottiFieldInlineEdit.ConfirmationValidation.NEVER:
				return false
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
