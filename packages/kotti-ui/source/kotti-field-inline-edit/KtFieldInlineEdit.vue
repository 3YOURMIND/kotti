<template>
	<div class="kt-field-inline-edit">
		<div class="kt-field-inline-edit__input">
			<KtFieldTextArea
				v-if="isMultiLine"
				v-bind="fieldTextAreaProps"
				:disabled="!isEditing"
				@blur="handleBlur"
				@focus="handleFocus"
				@input="handleInput"
			/>
			<KtFieldText
				v-else
				v-bind="fieldTextProps"
				:disabled="!isEditing"
				@blur="handleBlur"
				@focus="handleFocus"
				@input="handleInput"
			/>
		</div>
		<div v-if="isEditing" class="icon yoco" v-text="Yoco.Icon.CHECK" />
	</div>
</template>
<!-- TODO: formKey  -->
<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import { KottiFieldInlineEdit } from './types'

export default defineComponent<
	KottiFieldInlineEdit.PropsInternal<KottiFieldInlineEdit.Shared.Mode>
>({
	name: 'KtFieldInlineEdit',
	props: makeProps(KottiFieldInlineEdit.Regular.propsSchema),
	setup(props, { emit }) {
		const size = computed(() => {
			switch (props.mode) {
				case KottiFieldInlineEdit.Shared.Mode.HEADER:
					return Kotti.Field.Size.LARGE
				case KottiFieldInlineEdit.Shared.Mode.TEXT_LINE:
					return Kotti.Field.Size.SMALL
				default:
					return Kotti.Field.Size.MEDIUM
			}
		})

		const handleSetIsEditing = (value: boolean) => {
			if (props.isDisabled) return
			emit('setIsEditing', value)
		}

		const sharedProps = computed(() => ({
			class: {
				'kt-field-inline-edit--is-editing':
					props.isEditing && !props.isDisabled,
				[`kt-field-inline-edit--is-${
					// @ts-expect-error props.mode type matches the enum accessor expected type. TSC doesn't complain. Vetur does.
					KottiFieldInlineEdit.Shared.Mode[props.mode]
				}`]: true,
			},
			isDisabled: props.isDisabled,
			isLoading: props.isLoading,
			isOptional: props.isOptional,
			placeholder: props.placeholder ?? translations.value.placeholder,
			tabIndex: props.tabIndex ?? undefined,
			value: props.value,
		}))

		const translations = useTranslationNamespace('KtFieldInlineEdit')

		return {
			handleBlur: () => handleSetIsEditing(false),
			handleFocus: () => handleSetIsEditing(true),
			handleInput: (value: Kotti.FieldText.Value) => emit('input', value),
			isMultiLine: computed(
				() => props.mode === KottiFieldInlineEdit.Shared.Mode.MULTI_LINE,
			),
			fieldTextAreaProps: sharedProps.value,
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
					size: size.value,
				}
			}),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-inline-edit {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	&__input {
		width: 95%;
	}
	&--is-header {
		.icon {
			padding-top: 0.8rem;
		}
	}
	&--is-regular {
		.icon {
			padding-top: 2rem;
		}
	}
	&--is-textline {
		.icon {
			padding-top: 0.5rem;
		}
	}
	&--is-editing {
		::v-deep .kt-field__input-container:hover {
			background-color: var(--ui-background) !important;
		}
		::v-deep .kt-field-text-area__wrapper:hover {
			background-color: var(--ui-background) !important;
		}
	}
	::v-deep .kt-field__input-container:hover {
		background-color: var(--ui-05);
	}
	::v-deep .kt-field__input-container {
		border: none;
	}
	::v-deep .kt-field-text-area__wrapper:hover {
		background-color: var(--ui-05);
	}
	::v-deep .kt-field-text-area__wrapper {
		border: none;
	}
}
</style>
