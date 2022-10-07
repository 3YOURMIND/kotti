<template>
	<KtFieldTextArea
		v-if="isMultiLine"
		ref="fieldRef"
		v-bind="fieldTextAreaProps"
		@input="onEdit"
	>
		<template #container-right>
			<ConfirmButton
				ref="confirmButtonRef"
				v-bind="{ isEditing }"
				:tabIndex="tabIndex"
				@confirm="onButtonClick"
			/>
		</template>
	</KtFieldTextArea>
	<KtFieldText v-else ref="fieldRef" v-bind="fieldTextProps" @input="onEdit">
		<template #container-right>
			<ConfirmButton
				ref="confirmButtonRef"
				v-bind="{ isEditing }"
				:tabIndex="tabIndex"
				@confirm="onButtonClick"
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
	watch,
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

		const currentValue = ref<KottiFieldInlineEdit.Value>(props.value)
		watch(
			() => props.isEditing,
			(willEdit) => {
				if (willEdit) currentValue.value = props.value
			},
			{ immediate: true },
		)

		const confirmButtonRef = ref<{ $el: HTMLElement } | null>(null)
		const fieldRef = ref<{ $el: HTMLElement } | null>(null)

		const isConfirmButtonClicked = ref(false)

		const isMultiLine = computed(
			() => props.mode === KottiFieldInlineEdit.Shared.Mode.MULTI_LINE,
		)

		const onEnter = (event: KeyboardEvent) => {
			const isTriggeredByButton = confirmButtonRef.value?.$el === event.target

			const isTriggeredByField =
				fieldRef.value?.$el === event.target ||
				(event.target instanceof HTMLElement &&
					fieldRef.value?.$el.contains(event.target))

			// ignore enter within KtFieldTextArea (for new lines)
			if (isTriggeredByButton || (!isMultiLine.value && isTriggeredByField))
				confirmButtonRef.value?.$el.click()
		}

		const onClickOrTab = (event: MouseEvent | KeyboardEvent) => {
			if (event.target === null) return

			const isClickOutside =
				fieldRef.value?.$el !== event.target &&
				event.target instanceof HTMLElement &&
				!fieldRef.value?.$el.contains(event.target)

			if (!isClickOutside && !isConfirmButtonClicked.value) {
				updateIsEditing(true)
				return
			}

			if (isClickOutside) currentValue.value = props.value

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

		const onKeyup = (event: KeyboardEvent) => {
			switch (event.key) {
				case 'Tab':
					return onClickOrTab(event)
				case 'Enter':
					return onEnter(event)
			}
		}

		onBeforeMount(() => {
			window.addEventListener('click', onClickOrTab)
			window.addEventListener('keyup', onKeyup)
		})
		onUnmounted(() => {
			window.removeEventListener('click', onClickOrTab)
			window.addEventListener('keyup', onKeyup)
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
				value: currentValue.value,
			}
		})

		const translations = useTranslationNamespace('KtFieldInlineEdit')

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
			onButtonClick: () => {
				isConfirmButtonClicked.value = true
				emit('input', currentValue.value)
			},
			onEdit: (newVal: Kotti.FieldText.Value) => {
				if (props.isEditing) currentValue.value = newVal
			},
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
			cursor: pointer;
			background-color: var(--ui-05);
		}
	}

	::v-deep .kt-field__input-container,
	::v-deep .kt-field-text-area__wrapper {
		border: none;
	}
}
</style>
