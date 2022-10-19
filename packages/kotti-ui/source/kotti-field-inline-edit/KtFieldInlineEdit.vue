<template>
	<component
		:is="isMultiLine ? 'KtFieldTextArea' : 'KtFieldText'"
		ref="fieldRef"
		v-bind="fieldProps"
		@blur="updateIsEditing(false)"
		@enter="onEnter"
		@focus="updateIsEditing(true)"
		@input="onEdit"
	>
		<template v-if="mode === 'regular' && $slots.helpText" #helpText>
			{{ $slots.helpText }}
		</template>
		<template #container-right>
			<ConfirmButton
				ref="confirmButtonRef"
				v-bind="{ isEditing }"
				:tabIndex="tabIndex"
				@confirm="onConfirm(true)"
			/>
		</template>
	</component>
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
	watch,
} from '@vue/composition-api'

import { useField, useForceUpdate } from '../kotti-field/hooks'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import ConfirmButton from './components/ConfirmButton.vue'
import { KOTTI_FIELD_INLINE_EDIT_SUPPORTS } from './constants'
import { KottiFieldInlineEdit } from './types'
import { useSize } from './utils'

const isFieldOrButtonInFocus = (
	fieldRef: { $el: HTMLElement } | null,
	eventTarget: EventTarget | null,
) =>
	fieldRef?.$el === eventTarget ||
	(eventTarget instanceof HTMLElement && fieldRef?.$el.contains(eventTarget))

const blurInput = (inputRef: { $el: HTMLElement } | null) => {
	const isInputInFocus =
		document.activeElement instanceof HTMLElement &&
		(document.activeElement === inputRef?.$el ||
			inputRef?.$el.contains(document.activeElement))

	console.log('blurInput, isInputInFocus', isInputInFocus)

	if (document.activeElement instanceof HTMLElement && isInputInFocus)
		document.activeElement.blur()
}

export default defineComponent<
	KottiFieldInlineEdit.PropsInternal<KottiFieldInlineEdit.Shared.Mode>
>({
	name: 'KtFieldInlineEdit',
	components: {
		ConfirmButton,
	},
	props: makeProps(KottiFieldInlineEdit.Regular.propsSchema),
	setup(props, { emit }) {
		onBeforeMount(() => {
			window.addEventListener('click', onClick)
			window.addEventListener('focus', onFocusChange, true)
		})
		onUnmounted(() => {
			window.removeEventListener('click', onClick)
			window.addEventListener('focus', onFocusChange)
		})

		const regularModeProps = computed(() => {
			if (props.mode === KottiFieldInlineEdit.Shared.Mode.REGULAR) {
				const { helpDescription, helpText, label } =
					props as KottiFieldInlineEdit.PropsInternal<KottiFieldInlineEdit.Shared.Mode.REGULAR>

				return {
					helpDescription,
					helpText,
					label,
				}
			}

			return {
				helpDescription: null,
				helpText: null,
				label: null,
			}
		})

		const field = useField<KottiFieldInlineEdit.Value>({
			emit,
			isEmpty: (value) => value === null,
			props: reactive({
				...props,
				...regularModeProps.value,
				...(props.mode !== KottiFieldInlineEdit.Shared.Mode.MULTI_LINE && {
					hideClear: true,
					rightIcon: props.isEditing ? undefined : Yoco.Icon.EDIT,
				}),
				leftIcon: null,
				prefix: null,
				size: useSize(props.mode),
				suffix: null,
			}),
			supports: KOTTI_FIELD_INLINE_EDIT_SUPPORTS,
		})
		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		/**
		 * value maintained during editing and not emitted to user-app
		 * it gets initialised with the passed-down app value before editing starts
		 * and after it ends.
		 */
		const internalValue = ref<KottiFieldInlineEdit.Value>(field.currentValue)
		watch(
			() => field.currentValue,
			(newValue) => {
				console.log('in watcher on field.currentValue, newValue: ', newValue)
				internalValue.value = newValue
			},
			{ immediate: true },
		)

		const updateIsEditing = (shouldEdit: boolean) => {
			if (shouldEdit === props.isEditing) return

			internalValue.value = field.currentValue

			emit('update:isEditing', shouldEdit)
		}

		const confirmButtonRef = ref<{ $el: HTMLElement } | null>(null)
		const fieldRef = ref<{ $el: HTMLElement } | null>(null)

		const isMultiLine = computed(
			() => props.mode === KottiFieldInlineEdit.Shared.Mode.MULTI_LINE,
		)

		const triggeredByButton = ref(false)

		const onConfirm = (emittedByButton: boolean | undefined = false) => {
			// console.log('onConfirm, internalValue:', internalValue.value)
			triggeredByButton.value = emittedByButton

			// console.log(
			// 	'onConfirm, currentValue before forceUpdate:',
			// 	field.currentValue,
			// )

			// will be emitted through @input
			field.setValue(internalValue.value)
			forceUpdate()

			// console.log(
			// 	'onConfirm, currentValue after forceUpdate:',
			// 	field.currentValue,
			// )

			updateIsEditing(false)
			blurInput(fieldRef.value)
		}

		const onEnter = () => {
			console.log('onEnter', triggeredByButton.value)
			if (
				triggeredByButton.value ||
				/**
				 *  ignore enter within KtFieldTextArea to allow for new lines
				 */
				!isMultiLine.value
			)
				onConfirm()
		}

		const onClick = (event: MouseEvent | KeyboardEvent) => {
			if (event.target === null || props.isDisabled) return

			const isClickOutside =
				event.target !== fieldRef.value?.$el &&
				event.target instanceof HTMLElement &&
				!fieldRef.value?.$el.contains(event.target)

			if (!isClickOutside && !triggeredByButton.value)
				return updateIsEditing(true)

			triggeredByButton.value = false
			updateIsEditing(false)
			blurInput(fieldRef.value)
		}

		const lastFocusTarget = ref<EventTarget | null>(null)

		/**
		 * `tab` key presses don't trigger on mobile,
		 * and @blur events are tricky to implement given the implementation of
		 * `KtField`. Therefore, a listener is attached to DOM `focus` events.
		 *
		 * The target element is continuously maintained in a variable to compare
		 * changes and distinguish between ignore and confirm cases.
		 */
		const onFocusChange = (event: Event) => {
			const wereInFocus = isFieldOrButtonInFocus(
				fieldRef.value,
				lastFocusTarget.value,
			)
			const areInFocus = isFieldOrButtonInFocus(fieldRef.value, event.target)

			// case of blurring out of field without confirming
			if (wereInFocus && !areInFocus) updateIsEditing(false)

			lastFocusTarget.value = event.target
		}

		const translations = useTranslationNamespace('KtFieldInlineEdit')

		const fieldProps = computed(() => ({
			...field,
			class: {
				'kt-field-inline-edit': true,
				'kt-field-inline-edit--is-editing':
					props.isEditing && !props.isDisabled,
				[`kt-field-inline-edit--is-${props.mode}`]: true,
			},
			formKey: props.formKey,
			forceUpdateKey: forceUpdateKey.value,
			placeholder: props.placeholder ?? translations.value.placeholder,
			value: props.isEditing ? internalValue.value : field.currentValue,
		}))

		return {
			confirmButtonRef,
			field,
			fieldProps,
			fieldRef,
			isMultiLine,
			onConfirm,
			onEdit: (newVal: Kotti.FieldText.Value) => {
				console.log('onEdit')
				if (props.isEditing) internalValue.value = newVal
			},
			onEnter,
			updateIsEditing,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-field-inline-edit {
	::v-deep .kt-field__input-container,
	::v-deep .kt-field-text-area__wrapper {
		border: none;
	}

	&:not(.kt-field-inline-edit--is-editing) {
		::v-deep .kt-field__input-container-wrapper:hover {
			cursor: pointer;
			background-color: var(--ui-05);
		}
	}
}
</style>
