<template>
	<KtField v-bind="{ field }" :helpTextSlot="$slots.helpText" useFieldset>
		<template #container>
			<div :class="rootClasses" :forceUpdateKey="forceUpdateKey">
				<div
					v-for="(option, index) in options"
					:key="index"
					class="kt-field-radio-group__container"
				>
					<div class="kt-field-radio-group__header">
						<label
							class="kt-field-radio-group__label"
							:class="{
								'kt-field-radio-group__label--disabled':
									field.isDisabled || Boolean(option.isDisabled),
							}"
							:data-test="optionDataTest(option)"
						>
							<input
								v-bind="inputProps(option, index)"
								@change="onChange(option.value)"
							/>
							<div
								class="kt-field-radio-group__radio"
								:class="{
									'kt-field-radio-group__radio--checked':
										field.currentValue === option.value,
									'kt-field-radio-group__radio--is-disabled':
										field.isDisabled || Boolean(option.isDisabled),
								}"
							>
								<div class="kt-field-radio-group__radio-inside" />
							</div>
							<slot name="header" :option="option">
								<div v-text="option.label" />
							</slot>
						</label>
						<FieldHelpText
							v-if="option.tooltip"
							class="kt-field-radio-group__tooltip"
							:helpText="option.tooltip"
						/>
						<slot name="headerSide" :option="option" />
					</div>
					<div class="kt-field-radio-group__content">
						<slot name="content" :option="option" />
					</div>
				</div>
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import omit from 'lodash/omit.js'
import { computed, defineComponent } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

import { KtField } from '../kotti-field'
import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_RADIO_GROUP_SUPPORTS } from './constants'
import { KottiFieldRadioGroup } from './types'

export default defineComponent({
	name: 'KtFieldRadioGroup',
	components: {
		FieldHelpText,
		KtField,
	},
	props: makeProps(KottiFieldRadioGroup.propsSchema),
	emits: ['input'],
	setup(props, { emit }) {
		const field = useField<KottiFieldRadioGroup.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_RADIO_GROUP_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			forceUpdateKey: forceUpdateKey.value,
			inputProps: computed(
				() =>
					(
						option: KottiFieldRadioGroup.PropsInternal['options'][0],
						index: number,
					): InputHTMLAttributes & { class: string } => ({
						...omit(field.inputProps, ['data-test', 'id']),
						checked: field.currentValue === option.value,
						class: 'kt-field-radio-group__input',
						disabled: field.isDisabled || Boolean(option.isDisabled),
						id: `${field.inputProps.id}-${String(index)}`,
						name: field.inputProps.id,
						type: 'radio',
						value: option.value,
					}),
			),
			onChange: (value: KottiFieldRadioGroup.Entry['value']) => {
				field.setValue(value)

				forceUpdate()
			},
			optionDataTest: (option: KottiFieldRadioGroup.Entry) => {
				if (option.dataTest) return option.dataTest

				if (Object.keys(field.inputProps).includes('data-test')) {
					return [field.inputProps['data-test'], option.value].join('.')
				}
			},
			rootClasses: computed(() => ({
				'kt-field-radio-group': true,
				'kt-field-radio-group--inline': props.isInline,
			})),
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-field/mixins';

:root {
	--radio-size: 0.8rem;
	--radio-inside-side: 0.2rem;
}

.kt-field-radio-group {
	display: flex;
	flex: 1;

	&--inline {
		flex-direction: row;

		.kt-field-radio-group__container:not(:first-child) {
			margin-left: 1rem;
		}
	}

	&:not(&--inline) {
		flex-direction: column;

		.kt-field-radio-group__container:not(:first-child) {
			margin-top: 0.4rem;
		}
	}

	&__header {
		display: flex;
		align-items: flex-start;

		> *:not(:last-child) {
			margin-right: 0.3rem;
		}
	}

	&__label {
		display: flex;
		align-items: flex-start;
		cursor: pointer;

		> *:not(:last-child) {
			margin-right: 0.3rem;
		}

		&--disabled {
			color: var(--text-05);
			cursor: not-allowed;

			.kt-field-radio-group__radio {
				border-color: var(--ui-02);

				&--checked {
					background-color: var(--ui-02);
					box-shadow: var(--shadow-base);
				}
			}
		}
	}

	&__tooltip {
		// align tooltip icon with the center of the first line of the label
		// (assumption: font-size comes from common parent element)
		//  > starting point is upper end of the container (flex-start)
		//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
		//  > (-6px) Put it up half the height of the tooltip height (12px)
		transform: translateY(calc(0.75em - 6px));
	}

	&__input {
		width: 0;
		height: 0;

		&:focus + .kt-field-radio-group__radio {
			outline: 1px solid var(--primary-50);
			outline-offset: 3px;
		}

		&:focus:not(:focus-visible) + .kt-field-radio-group__radio {
			outline: none;
		}
	}

	&__radio {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: var(--radio-size);
		height: var(--radio-size);
		background-color: var(--ui-background);
		border: 1px solid var(--ui-02);
		border-radius: 50%;
		transition: all ease-in-out var(--transition-short);

		// align radio with the center of the first line of the label
		// (assumption: font-size comes from common parent element)
		//  > starting point is upper end of the container (flex-start)
		//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
		//  > (-var(--radio-size) * 0.5) Put it up half the height of the radio height
		transform: translateY(calc(0.75em - var(--radio-size) * 0.5));

		&:hover {
			border-color: var(--interactive-01-hover);
		}

		&:active {
			border-color: var(--interactive-01-active);
		}

		&--checked {
			background-color: var(--interactive-01);
			border-color: var(--interactive-01);
			box-shadow: var(--shadow-base);

			&:hover {
				background-color: var(--interactive-01-hover);
				border-color: var(--interactive-01-hover);
			}

			&:active {
				background-color: var(--interactive-01-active);
				border-color: var(--interactive-01-active);
			}
		}

		&--is-disabled {
			pointer-events: none;
		}
	}

	&__radio-inside {
		display: block;
		width: var(--radio-inside-side);
		height: var(--radio-inside-side);
		background-color: var(--ui-background);
		border-radius: 50%;
	}

	&__content {
		font-size: var(--font-size-small);
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		@if $type != empty {
			&:not(.kt-field__wrapper--disabled) {
				.kt-field-radio-group {
					&__radio {
						border-color: var(--support-#{$type});

						&--checked {
							background-color: var(--support-#{$type});
							box-shadow: var(--shadow-base);
						}
					}
				}
			}
		}
	}
}
</style>
