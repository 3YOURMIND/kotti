<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<textarea
			slot="container"
			v-bind="inputProps"
			@blur="$emit('blur')"
			@focus="$emit('focus')"
			@input="onInput"
		/>
		<template v-slot:container-right="{ classes }">
			<slot :classes="classes" name="container-right" />
		</template>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_TEXT_AREA_SUPPORTS } from './constants'
import { KottiFieldTextArea } from './types'

export default defineComponent<KottiFieldTextArea.PropsInternal>({
	name: 'KtFieldTextArea',
	components: {
		KtField,
	},
	props: makeProps(KottiFieldTextArea.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldTextArea.Value>({
			emit,
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
