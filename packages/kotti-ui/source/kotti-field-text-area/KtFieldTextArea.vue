<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<textarea slot="container" v-bind="inputProps" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KOTTI_FIELD_TEXT_AREA_SUPPORTS } from './constants'
import { KottiFieldTextArea } from './types'

export default defineComponent({
	name: 'KtFieldTextArea',
	components: { KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		rows: { default: 5, type: Number },
		value: { default: null, type: String },
	},
	setup(props: KottiFieldTextArea.Props, { emit }) {
		const field = useField<KottiFieldTextArea.Value, string | null>({
			emit,
			isCorrectDataType: (value): value is KottiFieldTextArea.Value =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_TEXT_AREA_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(
				(): Partial<HTMLTextAreaElement> & {
					class: string
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					class: 'kt-field-text-area__wrapper',
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					rows: props.rows,
					value: field.currentValue ?? '',
				}),
			),
			onInput: (event: { target: HTMLTextAreaElement }) => {
				const newValue = event.target.value
				field.setValue(newValue === '' ? null : newValue)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-field/mixins';

.kt-field-text-area {
	$vertical-padding: 0.6em;
	&__wrapper {
		display: flex;
		min-height: calc(#{$vertical-padding} * 2 + 1rem);
		padding: $vertical-padding 0.8em;
		margin: 0;
		resize: vertical;
		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		// remove scrollbar from IE entirely
		-ms-overflow-style: none;

		&::-webkit-scrollbar {
			opacity: 0;
		}

		scrollbar-width: thin;
		scrollbar-color: var(--ui-background) var(--ui-background);

		&:active,
		&:hover {
			scrollbar-color: var(--ui-03) var(--ui-background);
			transition: scrollbar-color var(--transition-medium) ease-out;

			&::-webkit-scrollbar {
				width: 5px;
				opacity: 1;
				transition: opacity var(--transition-medium) ease-out;
			}

			&::-webkit-scrollbar-thumb {
				cursor: all-scroll;

				background-color: var(--ui-03);
				border-radius: var(--field-border-radius);
			}
		}
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		&:not(.kt-field__wrapper--disabled) {
			@if $type != empty {
				/* stylelint-disable */
				.kt-field-text-area__wrapper {
					border-color: var(--support-#{$type}-light);
				}
			}

			&:focus-within {
				--support-empty-light: var(--interactive-05);

				.kt-field-text-area__wrapper {
					box-shadow: 0 0 0 1px var(--support-#{$type}-light);
					border-color: var(--support-#{$type}-light);
				}
				/* stylelint-enable */
			}
		}
	}

	&--disabled {
		.kt-field-text-area__wrapper {
			border-color: var(--ui-01);
		}
	}
}
</style>
