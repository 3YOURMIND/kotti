<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<div
			class="kt-field-number"
			:class="{
				'kt-field-number--is-hide-change-buttons': hideChangeButtons,
				'kt-field-number--has-maximum': showMaximum && maximum !== null,
			}"
		>
			<div
				v-if="!hideChangeButtons"
				class="kt-field-number__button"
				:class="decrementButtonClasses"
				@click="decrementValue"
			>
				<i class="yoco" v-text="Yoco.Icon.MINUS" />
			</div>
			<div class="kt-field-number__middle" @click="$refs.input.focus()">
				<input
					ref="input"
					v-bind="inputProps"
					@blur="handleBlur"
					@input="onInput($event.target.value)"
				/>
				<div v-if="showMaximum" v-text="'/'" />
				<div
					v-if="showMaximum"
					class="kt-field-number__middle__maximum"
					v-text="maximum"
				/>
			</div>
			<div
				v-if="!hideChangeButtons"
				class="kt-field-number__button"
				:class="incrementButtonClasses"
				@click="incrementValue"
			>
				<i class="yoco" v-text="Yoco.Icon.PLUS" />
			</div>
		</div>
	</KtField>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, computed, ref, watch } from '@vue/composition-api'
import Big from 'big.js'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import {
	KOTTI_FIELD_NUMBER_PROPS,
	KOTTI_FIELD_NUMBER_SUPPORTS,
	LEADING_ZEROES_REGEX,
	VALID_REGEX,
} from './constants'
import { KottiFieldNumber } from './types'
import {
	isInRange,
	isNumber,
	isStepMultiple,
	toNumber,
	toString,
} from './utilities'

export default defineComponent({
	name: 'KtFieldNumber',
	components: { KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_NUMBER_PROPS,
	},
	setup(props: KottiFieldNumber.Props, { emit, root }) {
		const field = useField<KottiFieldNumber.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldNumber.Value =>
				isNumber(value) || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_NUMBER_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		const isDecrementEnabled = computed(
			() =>
				!field.isDisabled &&
				isInRange({
					maximum: props.maximum,
					minimum: props.minimum,
					value:
						field.currentValue === null
							? null
							: Big(field.currentValue).minus(props.step).toNumber(),
				}),
		)

		const isIncrementEnabled = computed(
			() =>
				!field.isDisabled &&
				isInRange({
					maximum: props.maximum,
					minimum: props.minimum,
					value:
						field.currentValue === null
							? null
							: Big(field.currentValue).add(props.step).toNumber(),
				}),
		)

		const internalStringValue = ref('')

		const showMaximum = computed(
			() => props.maximum !== null && !props.hideMaximum,
		)

		watch(
			() => field.currentValue,
			(newNumber, oldNumber) => {
				const newString = toString(newNumber)
				const truncatedNumber = toNumber(newString)

				if (
					!isInRange({
						maximum: props.maximum,
						minimum: props.minimum,
						value: truncatedNumber,
					})
				)
					throw new RangeError(
						`KtFieldNumber: encountered an out-of-range number "${newNumber}"`,
					)

				if (
					!isStepMultiple({
						minimum: props.minimum,
						step: props.step,
						value: truncatedNumber,
					})
				)
					throw new Error(
						`KtFieldNumber: encountered a value "${newNumber}" that doesn't fit ((minimum + k * step): where k is an integer)`,
					)

				const shouldUpdate = oldNumber !== truncatedNumber
				if (shouldUpdate) internalStringValue.value = newString
			},
			{ immediate: true },
		)

		/**
		 * reference to input element, in order to track cursor position
		 * prior to feeding the value back to the input, which resets the position to the end.
		 */
		const input = ref<HTMLInputElement | null>(null)
		const lastUserSetCursorPosition = ref<number | null>(null)

		const setCursorPosition = (position: number | null) => {
			if (position !== null) input.value?.setSelectionRange(position, position)
		}

		watch(internalStringValue, () => {
			// in case the parent component accepts the @input event’s change, we need to restore the cursor position
			setCursorPosition(lastUserSetCursorPosition.value)
			lastUserSetCursorPosition.value = null
		})

		/**
		 * In the scenario when the user clicks the +/- buttons when the value is null
		 * we check if zero is in the range of accepted values, and fallback to it
		 */
		const canFallbackToZero = computed<boolean>(
			() =>
				isStepMultiple({
					minimum: props.minimum,
					step: props.step,
					value: 0,
				}) &&
				isInRange({
					maximum: props.maximum,
					minimum: props.minimum,
					value: 0,
				}),
		)

		return {
			decrementButtonClasses: computed(() => ({
				'kt-field-number__button--is-disabled': !isDecrementEnabled.value,
			})),
			decrementValue() {
				if (!isDecrementEnabled.value) return

				field.setValue(
					field.currentValue === null
						? canFallbackToZero.value
							? 0
							: props.minimum ?? props.maximum ?? 0
						: Big(field.currentValue).minus(props.step).toNumber(),
				)
			},
			field,
			handleBlur() {
				internalStringValue.value = toString(field.currentValue)
			},
			incrementButtonClasses: computed(() => ({
				'kt-field-number__button--is-disabled': !isIncrementEnabled.value,
			})),
			incrementValue() {
				if (!isIncrementEnabled.value) return

				field.setValue(
					field.currentValue === null
						? canFallbackToZero.value
							? 0
							: props.minimum ?? props.maximum ?? 0
						: Big(field.currentValue).add(props.step).toNumber(),
				)
			},
			internalStringValue,
			input,
			inputProps: computed(
				(): Partial<HTMLInputElement> & {
					class: object
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					class: {
						'kt-field-number__middle__input': true,
						'kt-field-number__middle__input--has-maximum': showMaximum.value,
					},
					disabled: field.isDisabled,
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					size: 1,
					type: 'text', // NOT A MISTAKE
					value: internalStringValue.value,
				}),
			),
			onInput(value: string) {
				lastUserSetCursorPosition.value = input.value?.selectionStart ?? null

				const { maximum, minimum, step } = props

				const valueWithoutLeadingZeroes = value.replace(
					LEADING_ZEROES_REGEX,
					'$1',
				)
				const nextNumber = toNumber(valueWithoutLeadingZeroes)

				const isTypedNumberValid =
					VALID_REGEX.test(valueWithoutLeadingZeroes) &&
					isStepMultiple({
						minimum,
						step,
						value: nextNumber,
					}) &&
					isInRange({
						maximum,
						minimum,
						value: nextNumber,
					})

				if (isTypedNumberValid) {
					const shouldEmit = nextNumber !== field.currentValue
					if (shouldEmit) field.setValue(nextNumber)
					else internalStringValue.value = valueWithoutLeadingZeroes
				}

				forceUpdate()

				/**
				 * Calculates new cursor position, which might be 1 character different than the last cursor position
				 * because we might reject the character the user just entered. Then, we’d need to -1 it to undo that change.
				 *
				 * FIXME: This may or may not move the cursor by 1 character if the parent component rejects the update.
				 * We decided that that’s an okay trade-off for now. If this ever needs to be fixed, it’s likely possible to fix by
				 * also looking at the shouldEmit to figure-out the new cursor position
				 */
				const newCursorPosition =
					lastUserSetCursorPosition.value === null
						? null
						: lastUserSetCursorPosition.value - (isTypedNumberValid ? 0 : 1)

				root.$nextTick(() => {
					setCursorPosition(newCursorPosition)
				})
			},
			showMaximum,
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@use 'sass:map';
@import '../kotti-field/mixins';

.kt-field__wrapper {
	$sizes: (
		'small': 1.3rem,
		'medium': 1.6rem,
		'large': 2rem,
	);

	&--disabled {
		.kt-field-number {
			&__button,
			&__middle {
				color: var(--text-05);
				background-color: var(--ui-01);
			}
		}
	}

	@each $type in 'small', 'medium', 'large' {
		&--is-#{$type} {
			/* stylelint-disable */
			.kt-field-number__button {
				height: map.get($sizes, $type);
				width: map.get($sizes, $type);
			}
			.kt-field-number__middle {
				height: map.get($sizes, $type);
			}
			/* stylelint-enable */
		}
	}
}

.kt-field-number {
	display: flex;
	align-items: center;
	font-variant-numeric: tabular-nums;

	&--is-hide-change-buttons:not(&--has-maximum) {
		.kt-field-number__middle__input {
			text-align: left;
		}
	}

	&__button {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--icon-02);
		cursor: pointer;
		user-select: none;
		background: var(--ui-01);
		border-radius: var(--field-border-radius);

		&:not(&--is-disabled):hover {
			background: var(--ui-02);
		}

		&--is-disabled {
			color: var(--text-05);
		}
	}

	&__middle {
		display: flex;
		flex: 1;
		align-items: center;

		&__input,
		&__maximum {
			display: flex;
			flex: 1;
			align-items: center;
			min-width: 0px;
			padding: 0;
		}

		&__input {
			width: 100%;
			text-align: center;
			border: none;

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				margin: 0;
				-webkit-appearance: none;
			}

			&--has-maximum {
				text-align: right;
			}

			&--is-disabled {
				color: var(--text-05);
			}
		}
	}
}
</style>
