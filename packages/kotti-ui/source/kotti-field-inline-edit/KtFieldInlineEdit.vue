<template>
	<component
		:is="isMultiLine ? 'KtFieldTextArea' : 'KtFieldText'"
		ref="fieldRef"
		v-bind="isMultiLine ? fieldTextAreaProps : fieldTextProps"
		@blur="updateIsEditing(false)"
		@enter="onEnter"
		@focus="updateIsEditing(true)"
		@input="onEdit"
	>
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

<!-- TODO: test formKey  -->
<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import {
	computed,
	defineComponent,
	onBeforeMount,
	onUnmounted,
	ref,
	watch,
} from '@vue/composition-api'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import ConfirmButton from './components/ConfirmButton.vue'
import { KottiFieldInlineEdit } from './types'
import { useSize } from './utils'

const isFieldOrButtonInFocus = (
	fieldRef: { $el: HTMLElement } | null,
	eventTarget: EventTarget | null,
) =>
	fieldRef?.$el === eventTarget ||
	(eventTarget instanceof HTMLElement && fieldRef?.$el.contains(eventTarget))

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

		const updateIsEditing = (shouldEdit: boolean) => {
			if (shouldEdit && props.isEditing) return

			internalValue.value = props.value

			emit('update:isEditing', shouldEdit)
		}

		const internalValue = ref<KottiFieldInlineEdit.Value>(props.value)
		watch(
			() => props.value,
			(newValue) => {
				internalValue.value = newValue
			},
			{ immediate: true },
		)

		const confirmButtonRef = ref<{ $el: HTMLElement } | null>(null)
		const fieldRef = ref<{ $el: HTMLElement } | null>(null)

		const isMultiLine = computed(
			() => props.mode === KottiFieldInlineEdit.Shared.Mode.MULTI_LINE,
		)

		const blurInput = () => {
			const isInputInFocus =
				document.activeElement instanceof HTMLElement &&
				(document.activeElement === fieldRef.value?.$el ||
					fieldRef.value?.$el.contains(document.activeElement))

			if (document.activeElement instanceof HTMLElement && isInputInFocus)
				document.activeElement.blur()
		}

		const triggeredByButton = ref(false)

		const onConfirm = (emittedByButton: boolean | undefined = false) => {
			triggeredByButton.value = emittedByButton
			emit('input', internalValue.value)
			updateIsEditing(false)
			blurInput()
		}

		const onEnter = () => {
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
			blurInput()
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
		const sharedProps = computed(() => {
			return {
				class: {
					'kt-field-inline-edit': true,
					'kt-field-inline-edit--is-editing':
						props.isEditing && !props.isDisabled,
					[`kt-field-inline-edit--is-${props.mode}`]: true,
				},
				hideValidation: props.hideValidation,
				isDisabled: props.isDisabled,
				isLoading: props.isLoading,
				isOptional: props.isOptional,
				placeholder: props.placeholder ?? translations.value.placeholder,
				tabindex: props.tabIndex,
				validator: props.validator,
				value: internalValue.value,
			}
		})

		return {
			confirmButtonRef,
			fieldRef,
			fieldTextAreaProps: sharedProps,
			fieldTextProps: computed(() => {
				let regularModeProps = {}
				if (props.mode === KottiFieldInlineEdit.Shared.Mode.REGULAR) {
					const { helpDescription, helpText, label } =
						props as KottiFieldInlineEdit.PropsInternal<KottiFieldInlineEdit.Shared.Mode.REGULAR>
					regularModeProps = {
						helpDescription,
						helpText,
						label,
					}
				}

				return {
					...sharedProps.value,
					...regularModeProps,
					hideClear: true,
					rightIcon: props.isEditing ? undefined : Yoco.Icon.EDIT,
					size: useSize(props.mode),
				}
			}),
			isMultiLine,
			onConfirm,
			onEdit: (newVal: Kotti.FieldText.Value) => {
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
