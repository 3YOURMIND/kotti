<template>
	<KtField
		v-bind="{ field }"
		ref="ktFieldRef"
		:class="{
			'kt-field__number-field--has-buttons': !hideChangeButtons,
		}"
		:helpTextSlot="$slots.helpText"
	>
		<div class="kt-field-number" :tabIndex="-1">
			<KtButton
				v-if="!hideChangeButtons"
				class="kt-field-number__button"
				:data-test="`${inputProps['data-test']}-decrement`"
				:disabled="!isDecrementEnabled"
				:icon="Yoco.Icon.MINUS"
				:tabIndex="-1"
				@click.stop="decrementValue"
			/>
			<div class="kt-field-number__middle" @click="onClickMiddle">
				<input
					ref="inputRef"
					v-bind="inputProps"
					@blur="onBlur"
					@input="onInput"
					@keydown="onKeydown"
					@keyup="onKeyup"
				/>
				<div v-if="showMaximum" v-text="'/'" />
				<div
					v-if="showMaximum"
					class="kt-field-number__maximum"
					v-text="maximum"
				/>
			</div>

			<KtButton
				v-if="!hideChangeButtons"
				class="kt-field-number__button"
				:data-test="`${inputProps['data-test']}-increment`"
				:disabled="!isIncrementEnabled"
				:icon="Yoco.Icon.PLUS"
				:tabIndex="-1"
				@click.stop="incrementValue"
			/>
		</div>
	</KtField>
</template>

<script lang="ts">
import Big from 'big.js'
import type { UnwrapRef } from 'vue'
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import type { InputHTMLAttributes } from 'vue/types/jsx'

import { Yoco } from '@3yourmind/yoco'

import { KtButton } from '../kotti-button'
import { KtField } from '../kotti-field'
import {
	useEmitBlur,
	useField,
	useForceUpdate,
	useInput,
	useKtFieldRef,
} from '../kotti-field/hooks'
import type { KottiField } from '../kotti-field/types'
import { useI18nContext } from '../kotti-i18n/hooks'
import type { KottiI18n } from '../kotti-i18n/types'
import { makeProps } from '../make-props'
import { DECIMAL_SEPARATORS_CHARACTER_SET, isNumberInRange } from '../utilities'

import {
	KOTTI_FIELD_NUMBER_SUPPORTS,
	LEADING_ZEROES_REGEX,
	VALID_REGEX,
} from './constants'
import { KottiFieldNumber } from './types'
import { isStepMultiple, toNumber, toString } from './utilities'

export default defineComponent({
	name: 'KtFieldNumber',
	components: {
		KtButton,
		KtField,
	},
	props: makeProps(KottiFieldNumber.propsSchema),
	emits: ['blur', 'input', 'keyup'],
	setup(props, { emit }) {
		const field = useField<KottiFieldNumber.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_NUMBER_SUPPORTS,
		})

		const { focusInput } = useInput(field.inputProps.id)
		const { forceUpdate, forceUpdateKey } = useForceUpdate()
		const i18nContext = useI18nContext()
		const ktFieldRef = useKtFieldRef()

		useEmitBlur({
			emit,
			field,
			fieldTarget: computed(() => ktFieldRef.value?.inputContainerRef ?? null),
		})

		const isDecrementEnabled = computed(
			() =>
				!field.isDisabled &&
				isNumberInRange({
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
				isNumberInRange({
					maximum: props.maximum,
					minimum: props.minimum,
					value:
						field.currentValue === null
							? null
							: Big(field.currentValue).add(props.step).toNumber(),
				}),
		)

		const internalStringValue = ref('')
		const lastValidTypedStringValue = ref('')
		const forceUpdateDisplayedValue = (newNumber: number | null) => {
			internalStringValue.value = toString(
				newNumber,
				props.decimalPlaces,
				i18nContext.numberFormat.decimalSeparator,
			)
			lastValidTypedStringValue.value = ''
		}

		const showMaximum = computed(
			() => props.maximum !== null && !props.hideMaximum,
		)

		watch(
			(): [
				KottiFieldNumber.Value,
				UnwrapRef<KottiI18n.Context['numberFormat']>['decimalSeparator'],
			] => [field.currentValue, i18nContext.numberFormat.decimalSeparator],
			([newNumber]) => {
				if (
					!isNumberInRange({
						maximum: props.maximum,
						minimum: props.minimum,
						value: newNumber,
					})
				)
					throw new RangeError(
						`KtFieldNumber: encountered an out-of-range number "${String(newNumber)}"`,
					)

				if (
					!isStepMultiple({
						minimum: props.minimum,
						step: props.step,
						value: newNumber,
					})
				)
					throw new Error(
						`KtFieldNumber: encountered a value "${String(newNumber)}" that doesn't fit ((minimum + k * step): where k is an integer)`,
					)

				if (toNumber(lastValidTypedStringValue.value) === newNumber) {
					internalStringValue.value = lastValidTypedStringValue.value
				} else {
					forceUpdateDisplayedValue(newNumber)
				}
			},
			{ flush: 'post', immediate: true },
		)

		/**
		 * reference to input element, in order to track cursor position
		 * prior to feeding the value back to the input, which resets the position to the end.
		 */
		const inputRef = ref<HTMLInputElement | null>(null)
		const lastUserSetCursorPosition = ref<number | null>(null)

		const setCursorPosition = (position: number | null) => {
			if (position !== null)
				inputRef.value?.setSelectionRange(position, position)
		}

		watch(
			internalStringValue,
			() => {
				// in case the parent component accepts the @input event’s change, we need to restore the cursor position
				setCursorPosition(lastUserSetCursorPosition.value)
				lastUserSetCursorPosition.value = null
			},
			{ flush: 'post' },
		)

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
				isNumberInRange({
					maximum: props.maximum,
					minimum: props.minimum,
					value: 0,
				}),
		)

		const decrementValue = () => {
			if (!isDecrementEnabled.value) return

			field.setValue(
				field.currentValue === null
					? canFallbackToZero.value
						? 0
						: (props.minimum ?? props.maximum ?? 0)
					: Big(field.currentValue).minus(props.step).toNumber(),
			)
			focusInput()
		}

		const incrementValue = () => {
			if (!isIncrementEnabled.value) return

			field.setValue(
				field.currentValue === null
					? canFallbackToZero.value
						? 0
						: (props.minimum ?? props.maximum ?? 0)
					: Big(field.currentValue).add(props.step).toNumber(),
			)
			focusInput()
		}

		return {
			decrementValue,
			field,
			incrementValue,
			inputProps: computed(
				(): InputHTMLAttributes &
					KottiField.Hook.Returns<KottiFieldNumber.Value>['inputProps'] & {
						class: Record<string, boolean>
						forceUpdateKey: number
					} => ({
					...field.inputProps,
					autocomplete: props.autoComplete,
					class: {
						'kt-field-number__input': true,
						'kt-field-number__input--has-maximum': showMaximum.value,
						'kt-field-number__input--left-aligned':
							!showMaximum.value &&
							props.hideChangeButtons &&
							props.align === 'left',
						'kt-field-number__input--right-aligned':
							!showMaximum.value &&
							props.hideChangeButtons &&
							props.align === 'right',
					},
					disabled: field.isDisabled,
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					size: 1,
					type: 'text', // NOT A MISTAKE
					value: internalStringValue.value,
				}),
			),
			inputRef,
			isDecrementEnabled,
			isIncrementEnabled,
			ktFieldRef,
			onBlur: () => {
				forceUpdateDisplayedValue(field.currentValue)
			},
			onClickMiddle: () => inputRef.value?.focus(),
			onInput: (event: Event) => {
				const value = (event.target as HTMLInputElement).value

				lastUserSetCursorPosition.value = inputRef.value?.selectionStart ?? null

				const { decimalPlaces, maximum, minimum, step } = props

				const valueWithoutLeadingZeroes = value.replace(
					LEADING_ZEROES_REGEX,
					'$1',
				)
				const nextNumber = toNumber(valueWithoutLeadingZeroes)

				const isTypedNumberValid =
					VALID_REGEX(decimalPlaces).test(valueWithoutLeadingZeroes) &&
					isStepMultiple({
						minimum,
						step,
						value: nextNumber,
					}) &&
					isNumberInRange({
						maximum,
						minimum,
						value: nextNumber,
					})

				if (isTypedNumberValid) {
					/**
					 * Replace all decimal places with the one provided by KtI18nContext
					 **/
					const valueWithSupportedDecimalSeparator =
						valueWithoutLeadingZeroes.replace(
							new RegExp(DECIMAL_SEPARATORS_CHARACTER_SET),
							i18nContext.numberFormat.decimalSeparator,
						)

					/**
					 * Preserve exact user input in case it’s possible to apply later
					 * E.g. when changing `1.01` to `1.0`, so that it doesn’t change to `1`
					 */
					lastValidTypedStringValue.value = valueWithSupportedDecimalSeparator

					const shouldEmit = nextNumber !== field.currentValue

					if (shouldEmit) field.setValue(nextNumber)
					else internalStringValue.value = valueWithSupportedDecimalSeparator
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

				nextTick(() => {
					setCursorPosition(newCursorPosition)
				})
			},
			onKeydown: (event: KeyboardEvent) => {
				if (event.code === 'ArrowUp') {
					event.preventDefault()
					incrementValue()
				} else if (event.code === 'ArrowDown') {
					decrementValue()
				}
			},
			onKeyup: (event: KeyboardEvent) => {
				emit('keyup', event)
			},
			showMaximum,
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@use 'sass:map';

.kt-field__wrapper {
	$sizes: (
		'small': 1.3rem,
		'medium': 1.6rem,
		'large': 2rem,
	);

	@each $type in 'small', 'medium', 'large' {
		&--is-#{$type} {
			.kt-field-number__button {
				width: map.get($sizes, $type);
				height: map.get($sizes, $type);
			}

			.kt-field-number__middle {
				height: map.get($sizes, $type);
			}
		}
	}
}

/* stylelint-disable selector-class-pattern */
.kt-field__number-field--has-buttons .kt-field__input-container {
	padding: 0 0.15rem;

	&__affix--left,
	&__affix--right {
		padding: 0 var(--unit-2);
	}

	&__icon--left {
		transform: translate(-0.1rem);
	}

	&__icon--right {
		transform: translate(0.1rem);
	}
}
/* stylelint-enable selector-class-pattern */

.kt-field-number {
	display: flex;
	align-items: center;
	font-variant-numeric: tabular-nums;

	&__middle {
		display: flex;
		flex: 1;
		align-items: center;
	}

	&__input,
	&__maximum {
		display: flex;
		flex: 1;
		align-items: center;
		min-width: 0;
		padding: 0;
	}

	&__input {
		width: 100%;
		text-align: center;
		border: none;

		&--has-maximum {
			text-align: right;
		}

		&--left-aligned {
			text-align: left;
		}

		&--right-aligned {
			text-align: right;
		}
	}
}
</style>
