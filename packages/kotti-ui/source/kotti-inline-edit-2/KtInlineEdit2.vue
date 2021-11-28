<template>
	<div v-if="isEditing" v-on-clickaway="handleCancel" :class="wrapperClass">
		<KtFieldTextArea
			v-if="isMultiLine"
			v-bind="{ ...ktFieldProps }"
			:value="value"
			@input="handleInput"
		/>
		<KtFieldText
			v-else
			v-bind="{ ...ktFieldProps }"
			hideClear
			:value="value"
			@input="handleInput"
		/>
		<div class="yoco" @click.stop="handleConfirm" v-text="'check'" />
	</div>

	<div
		v-else
		class="kt-inline-edit__display"
		@click.stop="toggleEdit(true, value)"
	>
		<label class="form-label" v-text="label" />
		<div :class="displayedValueClass" v-text="displayedValue" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { mixin as clickaway } from 'vue-clickaway'

import { KtButton } from '../kotti-button'
import { KtButtonGroup } from '../kotti-button-group'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import { KottiInlineEdit2 } from './types'
// TODO: match displayedValue size with field size
export default defineComponent<KottiInlineEdit2.PropsInternal>({
	name: 'KtInlineEdit2',
	mixins: [clickaway],
	components: { KtButton, KtButtonGroup },
	props: makeProps(KottiInlineEdit2.propsSchema),
	setup(props, { emit }) {
		const displayedValue = computed<string>(() =>
			props.value
				? props.stringToHtmlParser(props.value)
				: placeholderWithDefault.value,
		)
		const isEditing = ref<boolean>(false)
		const placeholderWithDefault = computed<string>(
			() => props.placeholder ?? translations.value.placeholder,
		)
		const toggleEdit = (editMode: boolean, preValue: string | null = null) => {
			isEditing.value = editMode
			valueBeforeEditing.value = preValue
		}
		const translations = useTranslationNamespace('KtInlineEdit2')
		const valueBeforeEditing = ref(null)

		return {
			displayedValue,
			displayedValueClass: computed(() => ({
				'kt-inline-edit__display__value': true,
				'kt-inline-edit__display__value--empty': !displayedValue.value,
			})),
			handleCancel: () => {
				emit('input', valueBeforeEditing.value)
				toggleEdit(false)
				emit('cancel')
			},
			handleConfirm: () => {
				emit('input', props.value)
				toggleEdit(false)
				emit('confirm')
			},
			handleInput: (
				newValue: Kotti.FieldText.Value | Kotti.FieldTextArea.Value,
			) => {
				emit('input', newValue)
			},
			isEditing,
			ktFieldProps: {
				label: props.label,
				placeholder: placeholderWithDefault.value,
				size: props.size,
			},
			toggleEdit,
			wrapperClass: computed(() => {
				return {
					'inline-edit': true,
					'label-value': !isEditing.value,
				}
			}),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-inline-edit {
	.yoco {
		color: var(--icon-01);
		&:hover {
			color: var(--interactive-01-hover);
		}
	}

	&__display {
		&:hover {
			cursor: pointer;
			.kt-inline-edit__display__value {
				background-color: var(--ui-02);
			}
		}

		&__value {
			&--empty {
				// TODO: not working
				color: var(--text-03);
			}
		}
	}
}
</style>
