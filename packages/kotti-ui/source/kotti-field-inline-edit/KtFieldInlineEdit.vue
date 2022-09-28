<template>
	<KtFieldTextArea
		ref="fieldRef"
		v-if="isMultiLine"
		v-bind="fieldTextAreaProps"
		@input="handleInput"
	>
		<template v-slot:container-right="{ classes }">
			<ConfirmButton
				v-bind="{ isEditing }"
				:class="classes"
				@confirm="handleConfirm"
			/>
		</template>
	</KtFieldTextArea>
	<KtFieldText
		v-else
		v-bind="fieldTextProps"
		@input="handleInput"
		ref="fieldRef"
	>
		<template v-slot:container-right="{ classes }">
			<ConfirmButton
				v-bind="{ isEditing }"
				:class="classes"
				@confirm="handleConfirm"
			/>
		</template>
	</KtFieldText>
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
} from '@vue/composition-api'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import ConfirmButton from './components/ConfirmButton.vue'
import { KottiFieldInlineEdit } from './types'
import { useSize } from './utils'

export default defineComponent<
	KottiFieldInlineEdit.PropsInternal<KottiFieldInlineEdit.Shared.Mode>
>({
	name: 'KtFieldInlineEdit',
	components: {
		ConfirmButton,
	},
	props: makeProps(KottiFieldInlineEdit.Regular.propsSchema),
	setup(props, { emit }) {
		const updateIsEditing = (value: boolean) => {
			if (props.isDisabled) return
			emit('update:isEditing', value)
		}

		const fieldRef = ref<{ $el: HTMLElement } | null>(null)
		const isConfirmButtonClicked = ref(false)
		const lastConfirmed = ref<
			Kotti.FieldText.Value | Kotti.FieldTextArea.Value
		>(null)

		const handleClick = (event: MouseEvent | KeyboardEvent) => {
			if (event.target === null) return

			const isClickOutside =
				fieldRef.value?.$el !== event.target &&
				!fieldRef.value?.$el.contains(event.target as HTMLElement)

			if (!isClickOutside && !isConfirmButtonClicked.value) {
				updateIsEditing(true)
				return
			}

			if (isClickOutside && lastConfirmed.value !== props.value) {
				emit('input', lastConfirmed.value)
			}

			if (isConfirmButtonClicked.value) {
				isConfirmButtonClicked.value = false
				if (
					document.activeElement instanceof HTMLElement &&
					(document.activeElement === fieldRef.value?.$el ||
						fieldRef.value?.$el.contains(document.activeElement))
				)
					document.activeElement.blur()
			}

			updateIsEditing(false)
		}
		const handleKeyup = (event: KeyboardEvent) => {
			if (event.key === 'Tab') handleClick(event)
		}

		onBeforeMount(() => {
			window.addEventListener('click', handleClick)
			window.addEventListener('keyup', handleKeyup)
		})
		onUnmounted(() => {
			window.removeEventListener('click', handleClick)
			window.addEventListener('keyup', handleKeyup)
		})

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
				value: props.value,
			}
		})

		const translations = useTranslationNamespace('KtFieldInlineEdit')

		return {
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
			handleConfirm: () => {
				isConfirmButtonClicked.value = true
				lastConfirmed.value = props.value
				emit('input', lastConfirmed.value)
				emit('confirm', lastConfirmed.value)
			},
			handleInput: (newVal: Kotti.FieldText.Value) => {
				emit('input', newVal)
			},
			isMultiLine: computed(
				() => props.mode === KottiFieldInlineEdit.Shared.Mode.MULTI_LINE,
			),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-field-inline-edit {
	&:not(.kt-field-inline-edit--is-editing) {
		::v-deep .kt-field__input-container-wrapper:hover {
			background-color: var(--ui-05);
			cursor: pointer;
		}
	}

	::v-deep .kt-field__input-container,
	::v-deep .kt-field-text-area__wrapper {
		border: none;
	}
}
</style>
