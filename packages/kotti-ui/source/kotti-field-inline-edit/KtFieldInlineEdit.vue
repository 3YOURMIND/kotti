<template>
	<KtField
		v-bind="{ field: modifiedField }"
		ref="fieldRef"
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
		<ConfirmButton
			v-if="isEditing"
			slot="container-right"
			:dataTest="sharedProps['data-test']"
			:tabIndex="sharedProps['tabindex']"
			@confirm="onConfirm"
		/>
	</KtField>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import {
	computed,
	defineComponent,
	onBeforeMount,
	onUnmounted,
	reactive,
	ref,
	toRefs,
	watch,
} from '@vue/composition-api'

import { useField, useForceUpdate } from '../kotti-field/hooks'
import { KottiField } from '../kotti-field/types'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Nullable } from '../types/utilities'
import { isOrContainsEventTarget } from '../utilities'

import ConfirmButton from './components/ConfirmButton.vue'
import EditIcon from './components/EditIcon.vue'
import { KOTTI_FIELD_INLINE_EDIT_SUPPORTS } from './constants'
import { useAdjustHeight, usePreventConfirm } from './hooks'
import {
	FieldInlineEditElement,
	KottiFieldInlineEdit,
	ComponentRef,
} from './types'
import { blurField, isInFocus } from './utils'

export default defineComponent({
	name: 'KtFieldInlineEdit',
	components: {
		ConfirmButton,
		EditIcon,
	},
	props: makeProps(KottiFieldInlineEdit.propsSchema),
	// eslint-disable-next-line sonarjs/cognitive-complexity
	setup(props: KottiFieldInlineEdit.PropsInternal, { emit }) {
		const { forceUpdate, forceUpdateKey } = useForceUpdate()
		const translations = useTranslationNamespace('KtFieldInlineEdit')

		const fieldRef = ref<ComponentRef>(null)
		const inputRef = ref<Nullable<FieldInlineEditElement>>(null)

		const isEditing = ref(false)
		const updateIsEditing = (shouldEdit: typeof isEditing.value) => {
			if (shouldEdit && props.isReadonly) {
				blurField(fieldRef.value)
				return
			}

			if (shouldEdit && !isInFocus(inputRef.value)) inputRef.value?.focus()

			if (shouldEdit === isEditing.value) return

			isEditing.value = shouldEdit
		}

		const field = useField<KottiFieldInlineEdit.Value>({
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
				: props.placeholder ?? translations.value.placeholder,
		)

		const setFieldValue = (newValue: KottiFieldInlineEdit.Value) => {
			modifiedField.setValue(newValue === '' ? null : newValue)
			forceUpdate()
		}

		const preEditingValue = ref<KottiFieldInlineEdit.Value>(
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
			blurField(fieldRef.value)

			emit('confirm', modifiedField.currentValue)
		}

		const onCancel = () => {
			setFieldValue(preEditingValue.value)

			updateIsEditing(false)

			blurField(fieldRef.value)
		}

		/**
		 * The last DOM element to capture focus/click events.
		 *
		 * In case of clicking on a focusable element, the focus event is captured first then the click event.
		 * In case of clicking on a non-focusable element, the focus event doesn't trigger.
		 */
		const lastEventTarget = ref<EventTarget | null>(null)

		const onClick = (event: MouseEvent | KeyboardEvent) => {
			if (event.target === null || props.isDisabled) return

			const isClickOutside = !isOrContainsEventTarget(
				fieldRef.value,
				event.target,
			)

			lastEventTarget.value = event.target

			if (isClickOutside) onCancel()
			else updateIsEditing(true)
		}

		const onFocusChange = (event: Event) => {
			if (event.target === null || props.isDisabled) return

			const wasFieldTriggered = isOrContainsEventTarget(
				fieldRef.value,
				lastEventTarget.value,
			)
			const isFieldTriggered = isOrContainsEventTarget(
				fieldRef.value,
				event.target,
			)

			lastEventTarget.value = event.target

			if (wasFieldTriggered === isFieldTriggered) return

			if (!isFieldTriggered) onCancel()
			else updateIsEditing(true)
		}

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
			window.addEventListener('click', onClick)
			window.addEventListener('focus', onFocusChange, { capture: true })
		})

		onUnmounted(() => {
			window.removeEventListener('click', onClick)
			window.removeEventListener('focus', onFocusChange)
		})

		const sharedProps = computed(
			(): KottiField.Hook.Returns<
				NonNullable<KottiFieldInlineEdit.Value>
			>['inputProps'] & {
				forceUpdateKey: number
				placeholder: string
				readonly: boolean
				value: NonNullable<KottiFieldInlineEdit.Value>
			} => ({
				...modifiedField.inputProps,
				forceUpdateKey: forceUpdateKey.value,
				placeholder: isEditing.value ? '' : fieldPlaceholder.value ?? '',
				readonly: props.isReadonly,
				value: modifiedField.currentValue ?? '',
			}),
		)

		return {
			fieldRef,
			inputProps: computed(
				(): Partial<HTMLInputElement> & {
					class: Record<string, boolean>
					forceUpdateKey: number
				} => ({
					...sharedProps.value,
					class: {
						'kt-field-inline-edit__input': true,
						...(props.textStyle !== null && { [props.textStyle]: true }),
					},
					type: 'text',
				}),
			),
			inputRef,
			isEditing,
			modifiedField,
			onCancel,
			onConfirm,
			onEdit: (event: { target: FieldInlineEditElement }) => {
				if (props.isReadonly || !isEditing.value) return

				const newValue = event.target.value

				setFieldValue(newValue)
			},
			onEnter: (
				event: KeyboardEvent & {
					target: FieldInlineEditElement
				},
			) => {
				if (!props.isMultiline || !event.shiftKey) {
					event.preventDefault()
					onConfirm()
				}
			},
			sharedProps,
			rootClasses: computed(() => ({
				'kt-field-inline-edit': true,
				'kt-field-inline-edit--is-editable': !props.isReadonly,
				'kt-field-inline-edit--is-editing':
					isEditing.value && !props.isDisabled,
				'kt-field-inline-edit--is-readonly': props.isReadonly,
			})),
			textareaProps: computed(
				(): Partial<HTMLTextAreaElement> & {
					class: Record<string, boolean>
					forceUpdateKey: number
				} => ({
					...sharedProps.value,
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
@import '../kotti-style/_variables.scss';

.kt-field-inline-edit {
	// slot that wraps <input /> & <EditIcon/>

	/* stylelint-disable-next-line selector-class-pattern */
	::v-deep .kt-field__input-container__slot {
		display: flex;
		align-items: center;
	}

	.h1,
	.h2,
	.h3 {
		margin: 0;
	}

	::v-deep .kt-field__input-container {
		background-color: transparent;
	}

	&--is-readonly {
		::v-deep .kt-field__input-container {
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

	&.kt-field-inline-edit--is-editable:hover:not(.kt-field-inline-edit--is-editing) {
		::v-deep .kt-field__wrapper:not(.kt-field__wrapper--disabled) {
			cursor: pointer;

			.kt-field__input-container {
				background-color: var(--ui-05);
			}

			.kt-field__input-container input {
				cursor: pointer;
			}
		}
	}

	&:not(.kt-field-inline-edit--is-editing) {
		.kt-field-inline-edit__input--is-multiline {
			word-break: break-all;
		}

		::v-deep .kt-field__input-container {
			border: 0;
		}
	}
}
</style>
