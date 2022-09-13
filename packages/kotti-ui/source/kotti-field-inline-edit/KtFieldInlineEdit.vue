<template>
	<div class="kt-field-inline-edit">
		<KtFieldTextArea
			v-if="isMultiLine"
			v-bind="fieldTextAreaProps"
			:disabled="!isEditing"
			@blur="handleBlur"
			@focus="handleFocus"
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
			:disabled="!isEditing"
			@blur="handleBlur"
			@focus="handleFocus"
			@input="handleInput"
		>
			<template v-slot:container-right="{ classes }">
				<ConfirmButton
					v-bind="{ isEditing }"
					:class="classes"
					@confirm="handleConfirm"
				/>
			</template>
		</KtFieldText>
	</div>
</template>
<!-- TODO: formKey  -->
<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

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
					size: useSize(props.mode),
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
