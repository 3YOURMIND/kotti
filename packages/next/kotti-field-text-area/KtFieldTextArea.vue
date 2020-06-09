<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<textarea slot="container" v-bind="inputProps" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KtFieldTextAreaProps } from './types'

export default defineComponent({
	name: 'KtFieldTextArea',
	components: { KtField },
	props: {
		...ktFieldProps,
		rows: { default: 5, type: Number },
	},
	setup(props: KtFieldTextAreaProps, { emit }) {
		const field = useField<string | null>({
			emit,
			isCorrectDataType: (value): value is string | null =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: {
				clear: false,
				decoration: false,
				placeholder: true,
				tabIndex: true,
			},
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed((): Partial<HTMLTextAreaElement> & {
				class: unknown
				forceUpdateKey: number
			} => ({
				...field.inputProps,
				class: ['kt-field-text-area__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				placeholder: field.placeholder ?? undefined,
				rows: props.rows,
				value: field.currentValue ?? '',
			})),
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
	@include validation using ($type) {
		&:not(.kt-field__wrapper--disabled) {
			@if $type != no-validation {
				/* stylelint-disable */
				.kt-field-text-area__wrapper {
					border-color: var(--support-#{$type}-light);
				}
			}

			&:focus-within {
				--support-no-validation-light: var(--interactive-05);
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
			color: var(--text-05);
			border-color: var(--ui-01);
		}
	}
}
</style>
