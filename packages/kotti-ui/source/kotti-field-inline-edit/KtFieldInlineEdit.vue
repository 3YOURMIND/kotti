<template>
	<KtField
		v-bind="{ field: modifiedField }"
		ref="ktFieldRef"
		:class="rootClasses"
		:helpTextSlot="$slots.helpText"
	>
		<EditIcon v-if="!isReadonly && !isEditing" :isDisabled="isDisabled" />
		<textarea
			v-if="isMultiline"
			ref="inputRef"
			v-bind="textareaProps"
			@input="onEdit"
			@keydown.enter="onEnter"
			@keyup.esc="onCancel"
		/>
		<input
			v-else
			ref="inputRef"
			v-bind="inputProps"
			@input="onEdit"
			@keydown.enter="onEnter"
			@keyup.esc="onCancel"
		/>
		<template #container-right>
			<ConfirmButton
				v-if="isEditing"
				:dataTest="sharedProps['data-test']"
				:tabIndex="sharedProps['tabindex']"
				@confirm="onConfirm"
			/>
		</template>
	</KtField>
</template>

<script lang="ts">
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import {
	computed,
	defineComponent,
	onBeforeMount,
	onUnmounted,
	reactive,
	ref,
	toRefs,
	watch,
} from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate, useKtFieldRef } from '../kotti-field/hooks'
import type { KottiField } from '../kotti-field/types'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import type { Nullable } from '../types/utilities'
import { blurElement, isInFocus, isOrContainsEventTarget } from '../utilities'

import ConfirmButton from './components/ConfirmButton.vue'
import EditIcon from './components/EditIcon.vue'
import { KOTTI_FIELD_INLINE_EDIT_SUPPORTS } from './constants'
import { useAdjustHeight, usePreventConfirm } from './hooks'
import type { FieldInlineEditElement } from './types'
import { KottiFieldInlineEdit } from './types'

export default defineComponent({
	name: 'KtFieldInlineEdit',
	components: {
		ConfirmButton,
		EditIcon,
		KtField,
	},
	props: makeProps(KottiFieldInlineEdit.propsSchema),
	emits: ['confirm', 'update:modelValue'],
	setup(props, { emit }) {
		const { forceUpdate, forceUpdateKey } = useForceUpdate()
		const translations = useTranslationNamespace('KtFieldInlineEdit')

		const ktFieldRef = useKtFieldRef()
		const inputContainerWrapperRef = ref<HTMLDivElement | null>(null)
		const inputRef = ref<Nullable<FieldInlineEditElement>>(null)

		const isEditing = ref(false)
		const updateIsEditing = (shouldEdit: typeof isEditing.value) => {
			if (shouldEdit && props.isReadonly) {
				blurElement(inputContainerWrapperRef.value)
				return
			}

			if (shouldEdit && !isInFocus(inputRef.value)) inputRef.value?.focus()

			if (shouldEdit === isEditing.value) return

			isEditing.value = shouldEdit
		}

		const field = useField<KottiFieldInlineEdit.ModelValue>({
			emit,
			isEmpty: (value) => value === null || value.trim() === '',
			props,
			supports: KOTTI_FIELD_INLINE_EDIT_SUPPORTS,
		})

		const modifiedField = reactive({
			...toRefs(field),
			hideValidation: computed(() => {
				if (props.isReadonly) return true
				if (isEditing.value) return false
				return field.hideValidation
			}),
		})

		useAdjustHeight({
			field: modifiedField,
			inputRef,
			props,
		})

		const fieldPlaceholder = computed(() =>
			props.isReadonly
				? null
				: (props.placeholder ?? translations.value.placeholder),
		)

		const setFieldValue = (newValue: KottiFieldInlineEdit.ModelValue) => {
			modifiedField.setValue(newValue === '' ? null : newValue)
			forceUpdate()
		}

		const preEditingValue = ref<KottiFieldInlineEdit.ModelValue>(
			modifiedField.currentValue,
		)

		const { preventConfirm } = usePreventConfirm({
			field: modifiedField,
			props,
		})

		watch(
			() => modifiedField.currentValue,
			(newValue) => {
				if (!isEditing.value) preEditingValue.value = newValue
			},
			{ immediate: true },
		)

		const onConfirm = () => {
			if (preventConfirm.value) {
				if (!isInFocus(inputRef.value)) inputRef.value?.focus()
				return
			}

			preEditingValue.value = modifiedField.currentValue

			updateIsEditing(false)
			blurElement(inputContainerWrapperRef.value)

			emit('confirm', modifiedField.currentValue)
		}

		const onCancel = () => {
			setFieldValue(preEditingValue.value)

			updateIsEditing(false)

			blurElement(inputContainerWrapperRef.value)
		}

		/**
		 * The last DOM element to capture focus/click events.
		 *
		 * In case of clicking on a focusable element, the focus event is captured first then the click event.
		 * In case of clicking on a non-focusable element, the focus event doesn't trigger.
		 */
		const lastEventTarget = ref<EventTarget | null>(null)

		const onMouseDown = (event: KeyboardEvent | MouseEvent) => {
			if (
				event.target === null ||
				props.isDisabled ||
				props.isLoading ||
				props.isReadonly
			)
				return

			const isClickOutside = !isOrContainsEventTarget(
				inputContainerWrapperRef.value,
				event.target,
			)

			lastEventTarget.value = event.target

			if (isClickOutside) onCancel()
			else updateIsEditing(true)
		}

		const onFocusChange = (event: Event) => {
			if (event.target === null || props.isDisabled) return

			const wasFieldTriggered = isOrContainsEventTarget(
				inputContainerWrapperRef.value,
				lastEventTarget.value,
			)
			const isFieldTriggered = isOrContainsEventTarget(
				inputContainerWrapperRef.value,
				event.target,
			)

			lastEventTarget.value = event.target

			if (wasFieldTriggered === isFieldTriggered) return

			if (!isFieldTriggered) onCancel()
			else updateIsEditing(true)
		}

		watch(ktFieldRef, () => {
			if (ktFieldRef.value?.inputContainerWrapperRef)
				inputContainerWrapperRef.value =
					ktFieldRef.value.inputContainerWrapperRef
		})

		watch(
			() => props.textStyle,
			() => {
				if (props.textStyle !== null && props.isMultiline) {
					throw new Error(
						`textStyle prop is not supported with isMultiline prop`,
					)
				}
			},
			{ immediate: true },
		)

		onBeforeMount(() => {
			window.addEventListener('mousedown', onMouseDown)
			window.addEventListener('focus', onFocusChange, { capture: true })
		})

		onUnmounted(() => {
			window.removeEventListener('mousedown', onMouseDown)
			window.removeEventListener('focus', onFocusChange)
		})

		const sharedProps = computed(
			(): KottiField.Hook.Returns<
				NonNullable<KottiFieldInlineEdit.ModelValue>
			>['inputProps'] & {
				forceUpdateKey: number
				placeholder: string
				readonly: boolean
				value: NonNullable<KottiFieldInlineEdit.ModelValue>
			} => ({
				...modifiedField.inputProps,
				forceUpdateKey: forceUpdateKey.value,
				placeholder: isEditing.value ? '' : (fieldPlaceholder.value ?? ''),
				readonly: props.isReadonly,
				value: modifiedField.currentValue ?? '',
			}),
		)

		return {
			inputContainerWrapperRef,
			inputProps: computed(
				(): {
					class: Record<string, boolean>
					forceUpdateKey: number
				} & (InputHTMLAttributes | TextareaHTMLAttributes) => ({
					...sharedProps.value,
					autocomplete: props.autoComplete,
					class: {
						'kt-field-inline-edit__input': true,
						...(props.textStyle !== null && { [props.textStyle]: true }),
					},
					type: 'text',
				}),
			),
			inputRef,
			isEditing,
			ktFieldRef,
			modifiedField,
			onCancel,
			onConfirm,
			onEdit: (event: Event) => {
				if (props.isReadonly || !isEditing.value) return

				const newValue = (event.target as FieldInlineEditElement).value

				setFieldValue(newValue)
			},
			onEnter: (event: KeyboardEvent) => {
				if (!props.isMultiline || !event.shiftKey) {
					event.preventDefault()
					onConfirm()
				}
			},
			rootClasses: computed(() => ({
				'kt-field-inline-edit': true,
				'kt-field-inline-edit--is-editable': !props.isReadonly,
				'kt-field-inline-edit--is-editing':
					isEditing.value && !props.isDisabled,
				'kt-field-inline-edit--is-readonly': props.isReadonly,
			})),
			sharedProps,
			textareaProps: computed(
				(): TextareaHTMLAttributes & {
					class: Record<string, boolean>
					forceUpdateKey: number
				} => ({
					...sharedProps.value,
					autocomplete: props.autoComplete,
					class: {
						'kt-field-inline-edit__input': true,
						'kt-field-inline-edit__input--is-multiline': true,
					},
					rows: 1,
				}),
			),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables';

.kt-field-inline-edit {
	// slot that wraps <input /> & <EditIcon/>

	/* stylelint-disable-next-line selector-class-pattern */
	:deep(.kt-field__input-container__slot) {
		display: flex;
		gap: var(--unit-2);
		align-items: center;
	}

	.h1,
	.h2,
	.h3 {
		margin: 0;
	}

	:deep(.kt-field__input-container) {
		background-color: transparent;
	}

	&--is-readonly {
		:deep(.kt-field__input-container) {
			box-shadow: none !important;
		}
	}

	&__input {
		display: flex;
		flex: 1;
		width: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;

		&:not(.kt-field-inline-edit__input--is-multiline) {
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&--is-multiline {
			padding-top: 0.6em;
			padding-bottom: 0.6em;
			overflow: hidden;
			resize: none;
		}
	}

	&.kt-field-inline-edit--is-editable:hover:not(
			.kt-field-inline-edit--is-editing
		) {
		:deep(.kt-field__wrapper:not(.kt-field__wrapper--disabled)) {
			.kt-field__input-container:hover {
				cursor: pointer;
				background-color: var(--ui-05);

				input,
				textarea {
					cursor: pointer;
				}
			}
		}
	}

	&:not(.kt-field-inline-edit--is-editing) {
		.kt-field-inline-edit__input--is-multiline {
			word-break: normal;
		}

		:deep(.kt-field__input-container) {
			border: 0;
		}
	}
}
</style>
