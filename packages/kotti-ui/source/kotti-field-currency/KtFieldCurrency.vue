<template>
	<KtField
		:field="modifiedField"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<input
			ref="inputRef"
			v-bind="inputProps"
			@input="onInput($event.target.value)"
		/>
	</KtField>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import {
	defineComponent,
	computed,
	ref,
	watch,
	UnwrapRef,
} from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { useI18nContext } from '../kotti-i18n/hooks'
import { KottiI18n } from '../kotti-i18n/types'
import { makeProps } from '../make-props'
import { DecimalSeparator } from '../types/kotti'
import { isNumberInRange } from '../utilities'

import { KOTTI_FIELD_CURRENCY_SUPPORTS, VALID_REGEX } from './constants'
import { parseCurrencyUserInput } from './input-parser'
import { KottiFieldCurrency } from './types'
import {
	toFixedPrecisionString,
	toNumber,
	replaceDecimalSeparator,
	truncate,
} from './utilities'

/**
 * flag to decide to set field to null,
 * when user deletes twice in a row,
 * after already getting to 0.00
 */
const shouldClear = (newValue: string, oldValue: string | null) => {
	const isOldValueZeroOrNull = !toNumber(oldValue)
	const isNewValueZero = !toNumber(newValue)
	const isDeleting = newValue.length < oldValue?.length

	return isOldValueZeroOrNull && isNewValueZero && isDeleting
}

export default defineComponent<KottiFieldCurrency.PropsInternal>({
	name: 'KtFieldCurrency',
	components: { KtField },
	props: makeProps(KottiFieldCurrency.propsSchema),
	setup(props, { emit, root }) {
		const field = useField<KottiFieldCurrency.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldCurrency.Value =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_CURRENCY_SUPPORTS,
		})

		const i18nContext = useI18nContext()

		const currencyFormat = computed<KottiI18n.CurrencyMap[string]>(() => {
			if (!(props.currency in i18nContext.currencyMap))
				throw new Error(
					`KtFieldCurrency: couldn't find key: ${props.currency} in KtI18nContext.Props['currencyMap']`,
				)

			return i18nContext.currencyMap[props.currency]
		})

		/**
		 * reference to input element, in order to track cursor position
		 * prior to feeding the value back to the input, which resets the position to the end.
		 */
		const inputRef = ref<HTMLInputElement | null>(null)
		const userCursorPositionFromRight = ref<number | null>(null)

		const setCursorPosition = (position: number | null) => {
			root.$nextTick(() => {
				if (position === null || inputRef.value === null) return

				const newPosition = inputRef.value.value.length - position
				inputRef.value.setSelectionRange(newPosition, newPosition)
			})
		}

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		const internalStringValue = ref('')

		watch(
			(): [KottiFieldCurrency.Value, KottiI18n.CurrencyMap[string]] => [
				field.currentValue,
				currencyFormat.value,
			],
			([newValue, newFormat]) => {
				const newNumber = toNumber(newValue)
				if (newNumber === null) return

				const newDecimalPlaces = newFormat.decimalPlaces

				const isEqualPrecision = truncate(newNumber, newDecimalPlaces).eq(
					newNumber,
				)

				if (!isEqualPrecision)
					throw new Error(
						[
							`KtFieldCurrency: field.currentValue “${newValue}” has more precision than is allowed (${newDecimalPlaces}).`,
							'This is an issue because there would be a difference between displayed and actual value',
						].join(' '),
					)
			},
			{ immediate: true },
		)

		watch(
			(): [
				KottiFieldCurrency.Value,
				UnwrapRef<KottiI18n.Context['numberFormat']>['decimalSeparator'],
				typeof currencyFormat,
			] => [
				field.currentValue,
				i18nContext.numberFormat.decimalSeparator,
				currencyFormat,
			],
			([newValue, newDecimalSeparator, newCurrencyFormat]) => {
				if (
					!isNumberInRange({
						maximum: props.maximum,
						minimum: props.minimum,
						value: toNumber(newValue),
					})
				)
					throw new RangeError(
						`KtFieldCurrency: encountered an out-of-range number "${newValue}"`,
					)

				const isLogicallyDifferent =
					toNumber(newValue) !== toNumber(internalStringValue.value)

				if (isLogicallyDifferent) {
					internalStringValue.value = replaceDecimalSeparator(
						toFixedPrecisionString(
							newValue,
							newCurrencyFormat.value.decimalPlaces,
						),
						newDecimalSeparator,
					)

					setCursorPosition(userCursorPositionFromRight.value)
					userCursorPositionFromRight.value = null
				}
			},
			{ immediate: true },
		)

		return {
			modifiedField: computed(() => ({
				...field,
				prefix: currencyFormat.value.symbol,
			})),
			inputRef,
			inputProps: computed(
				(): Partial<HTMLInputElement> & {
					class: Record<string, boolean>
					forceUpdateKey: number
				} => ({
					...field.inputProps,
					class: {
						'kt-field-currency__input': true,
					},
					disabled: field.isDisabled,
					forceUpdateKey: forceUpdateKey.value,
					placeholder: props.placeholder ?? undefined,
					size: 1,
					type: 'text', // NOT A MISTAKE
					value: internalStringValue.value,
				}),
			),
			onInput: (value: string) => {
				userCursorPositionFromRight.value =
					value.length - inputRef.value?.selectionStart ?? null

				const { maximum, minimum } = props

				const isValid = VALID_REGEX.test(value)

				const nextString = isValid
					? formatCurrencyUserInput({
							value: replaceDecimalSeparator(value, DecimalSeparator.DOT),
							decimalPlaces: currencyFormat.value.decimalPlaces,
					  })
					: ''

				const isTypedNumberValid =
					isValid &&
					isNumberInRange({
						maximum,
						minimum,
						value: nextString === '' ? null : Number.parseFloat(nextString),
					})

				const emitNull = shouldClear(value, internalStringValue.value)
				if (isTypedNumberValid) field.setValue(emitNull ? null : nextString)

				forceUpdate()

				setCursorPosition(userCursorPositionFromRight.value)
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss">
.kt-field-currency__input {
	display: flex;

	width: 100%;
	padding: 0;
	margin: 0;

	font-variant-numeric: tabular-nums;
	line-height: 1.6;
	text-align: right;

	border: 0;
}
</style>
