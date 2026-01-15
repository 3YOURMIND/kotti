<template>
	<KtField v-bind="{ field }" :helpTextSlot="$slots.helpText">
		<template #container>
			<textarea
				ref="textareaRef"
				v-bind="inputProps"
				@blur="onBlur"
				@input="onInput"
				@keyup="onKeyup"
			/>
		</template>
	</KtField>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	ref,
	type TextareaHTMLAttributes,
} from 'vue'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_TEXT_AREA_SUPPORTS } from './constants'
import { KottiFieldTextArea } from './types'

const HEIGHT_OFFSET = 3

const resizeTextarea = ({
	autoSize,
	maxHeight,
	textarea,
}: {
	autoSize: boolean
	maxHeight: number | null
	textarea: HTMLTextAreaElement | null
}) => {
	if (
		textarea &&
		autoSize &&
		(!maxHeight || textarea.scrollHeight <= maxHeight)
	) {
		textarea.setAttribute('style', 'height: auto')
		textarea.setAttribute(
			'style',
			`height: ${String(textarea.scrollHeight + HEIGHT_OFFSET)}px`,
		)
	}
}

export default defineComponent({
	name: 'KtFieldTextArea',
	components: {
		KtField,
	},
	props: makeProps(KottiFieldTextArea.propsSchema),
	emits: ['blur', 'keyup', 'update:modelValue'],
	setup(props, { emit }) {
		const field = useField<KottiFieldTextArea.ModelValue>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_TEXT_AREA_SUPPORTS,
		})
		const textareaRef = ref<HTMLTextAreaElement | null>(null)

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(
				(): TextareaHTMLAttributes & {
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					autocomplete: props.autoComplete,
					class: 'kt-field-text-area__wrapper',
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					rows: props.rows,
					value: field.currentValue ?? '',
				}),
			),
			onBlur: () => {
				emit('blur', field.currentValue)
			},
			onInput: (event: Event) => {
				const target = event.target as HTMLTextAreaElement
				field.setValue(target.value === '' ? null : target.value)

				resizeTextarea({
					autoSize: props.autoSize,
					maxHeight: props.maxHeight,
					textarea: target,
				})

				forceUpdate()
			},
			onKeyup: (event: KeyboardEvent) => {
				emit('keyup', event)
			},
			textareaRef,
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
		flex: 1;
		min-height: calc(#{$vertical-padding} * 2 + 1rem);
		padding: $vertical-padding 0.8em;
		margin: 0;
		resize: vertical;
		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		@include prettify-scrollbar;
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		&:not(.kt-field__wrapper--disabled) {
			@if $type != empty {
				&.kt-field__wrapper--is-borderless {
					.kt-field-text-area__wrapper {
						background-color: rgb(from var(--support-#{$type}-bg) r g b / 25%);
					}
				}

				&:not(.kt-field__wrapper--is-borderless) {
					.kt-field-text-area__wrapper {
						border-color: var(--support-#{$type}-light);
					}
				}
			}

			&:focus-within {
				--support-empty-light: var(--interactive-05);

				.kt-field-text-area__wrapper {
					background-color: unset;
					border-color: var(--support-#{$type}-light);
					box-shadow: 0 0 0 1px var(--support-#{$type}-light);
				}
			}

			.kt-field-text-area__wrapper:not(:focus-within):hover {
				--support-empty-bg: var(--interactive-02-hover);
				--support-empty-light: var(--interactive-04);

				background-color: var(--support-#{$type}-bg);
				border-color: var(--support-#{$type}-light);
			}
		}
	}

	&--disabled {
		.kt-field-text-area__wrapper {
			border-color: var(--ui-01);
		}
	}

	&--is-borderless {
		.kt-field-text-area__wrapper {
			background-color: rgb(from var(--ui-02) r g b / 25%);
			border-color: transparent;
		}
	}
}
</style>
