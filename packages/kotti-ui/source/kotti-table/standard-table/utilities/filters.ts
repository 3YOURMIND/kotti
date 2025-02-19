import { Dashes } from '@metatypes/typography'

import type { KottiFieldDateRange } from '../../../kotti-field-date/types'
import type { KottiFieldNumber } from '../../../kotti-field-number/types'
import type {
	KottiFieldMultiSelect,
	KottiFieldSingleSelect,
} from '../../../kotti-field-select/types'
import type { KottiFieldToggle } from '../../../kotti-field-toggle/types'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { KottiStandardTable } from '../types'

/**
 * Returns the empty nullish value
 * @param filter the filter
 * @returns the empty value
 */
export const getEmptyValue = (
	filter: KottiStandardTable.FilterInternal,
): KottiStandardTable.FilterValue => {
	switch (filter.type) {
		case KottiStandardTable.FilterType.DATE_RANGE:
		case KottiStandardTable.FilterType.NUMBER_RANGE:
			return [null, null]
		case KottiStandardTable.FilterType.MULTI_SELECT:
			return []
		default:
			return null
	}
}

/**
 * Returns the option label
 * @param options the options array
 * @param value the option value
 * @returns the option label
 */
const getOptionLabel = (
	options: KottiFieldSingleSelect.Props['options'],
	value: KottiFieldSingleSelect.Value,
): string => options.find((option) => option.value === value)?.label ?? ''

/**
 * Formats the filter value as a human readably string
 * @param value the value
 * @param filter the filter
 * @returns the value as a formated string
 */
export const formatFilterValue = (
	value: KottiStandardTable.FilterValue,
	filter: KottiStandardTable.FilterInternal,
	// eslint-disable-next-line sonarjs/cognitive-complexity
): string => {
	switch (filter.type) {
		case KottiStandardTable.FilterType.BOOLEAN: {
			// FIXME: useTranslationNamespace should not be called outside of hooks => this should be a hook or
			// the translation object should be passed from the outside
			const translations = useTranslationNamespace('KtTable')
			const _value = value as KottiFieldToggle.Value
			return _value ? translations.value.yes : ''
		}
		case KottiStandardTable.FilterType.DATE_RANGE: {
			const _value = value as KottiFieldDateRange.Value
			return _value[0] === null ? '' : _value.join(Dashes.EnDash)
		}
		case KottiStandardTable.FilterType.MULTI_SELECT: {
			const _value = value as KottiFieldMultiSelect.Value
			return _value.map((v) => getOptionLabel(filter.options, v)).join(', ')
		}
		case KottiStandardTable.FilterType.NUMBER_RANGE: {
			const _value = value as [KottiFieldNumber.Value, KottiFieldNumber.Value]
			const [min, max] = _value

			if (min === null && max === null) return ''

			const unit = filter.unit ? ` ${filter.unit}` : ''

			if (min !== null && max !== null)
				return min === max
					? `${min}${unit}`
					: `${min}${Dashes.EnDash}${max}${unit}`

			// FIXME: useTranslationNamespace should not be called outside of hooks => this should be a hook or
			// the translation object should be passed from the outside
			const translations = useTranslationNamespace('KtStandardTable')

			return max !== null
				? `${translations.value.upTo} ${max}${unit}`
				: min !== null
					? `${translations.value.moreThan} ${min}${unit}`
					: ''
		}
		case KottiStandardTable.FilterType.SINGLE_SELECT: {
			const _value = value as KottiFieldSingleSelect.Value
			return getOptionLabel(filter.options, _value)
		}
	}
}

/**
 * Checks if the value is nullish
 * @param value the field value
 * @returns true if the value is nullish, false otherwise
 */
export const isEmptyValue = (value: KottiStandardTable.FilterValue): boolean =>
	Array.isArray(value)
		? value.length === 0 || (value[0] === null && value[1] === null)
		: value === null

/**
 * Re-orders the Number Range filter value to be [min, max].
 * Value is re-ordered only if both, min and max, are not null values.
 * @param range the Number Range filter value
 * @returns the re-ordered range value
 */
export const getReorderedRange = (
	range: [KottiFieldNumber.Value, KottiFieldNumber.Value],
): [KottiFieldNumber.Value, KottiFieldNumber.Value] => {
	const [min, max] = range

	if (min !== null && max !== null && min > max) return [max, min]

	return range
}
