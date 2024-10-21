<template>
	<fieldset class="number-range-filter">
		<div v-if="filter.label" class="number-range-filter__header">
			<legend class="number-range-filter__label">
				<span v-text="filter.label" />
			</legend>
		</div>
		<div class="number-range-filter__field">
			<KtFieldNumber
				v-bind="minFieldProps"
				@blur="onMinInputBlur"
				@input="onMinValueInput"
			/>
			<KtFieldNumber
				v-bind="maxFieldProps"
				@blur="onMaxInputBlur"
				@input="onMaxValueInput"
			/>
		</div>
	</fieldset>
</template>

<script lang="ts">
import isEqual from 'lodash/isEqual.js'
import { computed, defineComponent, type PropType, ref, watch } from 'vue'

import type { KottiFieldNumber } from '../../../../kotti-field-number/types'
import { useTranslationNamespace } from '../../../../kotti-i18n/hooks'
import type { KottiStandardTable } from '../../types'
import { getReorderedRange } from '../../utilities/filters'

export default defineComponent({
	name: 'NumberRangeFilter',
	props: {
		filter: {
			required: true,
			type: Object as PropType<
				KottiStandardTable.FilterInternal & {
					type: KottiStandardTable.FilterType.NUMBER_RANGE
				}
			>,
		},
		isLoading: { default: false, type: Boolean },
		value: {
			default: () => [null, null],
			type: Array as unknown as PropType<[number | null, number | null]>,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtStandardTable')

		const range = ref<[KottiFieldNumber.Value, KottiFieldNumber.Value]>([
			null,
			null,
		])

		const reOrderAndEmitRangeValue = () => {
			range.value = getReorderedRange(range.value)

			emit('input', {
				id: props.filter.id,
				operation: props.filter.operations[0], // Current filters support only one operation
				value: range.value,
			})
		}

		watch(
			() => props.value,
			(newRange) => {
				if (!isEqual(newRange, range.value))
					range.value = [newRange[0], newRange[1]]
			},
			{ immediate: true },
		)

		return {
			maxFieldProps: computed(() => ({
				dataTest: [props.filter.dataTest, 'max-value-input']
					.filter(Boolean)
					.join('.'),
				decimalPlaces: props.filter.decimalPlaces,
				hideChangeButtons: true,
				isLoading: props.isLoading,
				isOptional: true,
				placeholder: translations.value.max,
				prefix: props.filter.unit,
				size: 'small',
				value: range.value[1],
			})),
			minFieldProps: computed(() => ({
				dataTest: [props.filter.dataTest, 'min-value-input']
					.filter(Boolean)
					.join('.'),
				decimalPlaces: props.filter.decimalPlaces,
				hideChangeButtons: true,
				isLoading: props.isLoading,
				isOptional: true,
				placeholder: translations.value.min,
				prefix: props.filter.unit,
				size: 'small',
				value: range.value[0],
			})),
			onMaxInputBlur: (newMax: KottiFieldNumber.Value) => {
				if (props.value[1] !== newMax) reOrderAndEmitRangeValue()
			},
			onMinInputBlur: (newMin: KottiFieldNumber.Value) => {
				if (props.value[0] !== newMin) reOrderAndEmitRangeValue()
			},
			onMaxValueInput: (newMax: KottiFieldNumber.Value) => {
				range.value = [range.value[0], newMax]
			},
			onMinValueInput: (newMin: KottiFieldNumber.Value) => {
				range.value = [newMin, range.value[1]]
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.number-range-filter {
	display: flex;
	flex-direction: column;
	gap: var(--unit-2);

	/* overwrite fieldset properties */
	padding: 0;
	margin: 0;
	border: none;

	&__field {
		display: flex;
		gap: var(--unit-4);
		align-items: center;

		:deep(.kt-field) {
			flex: 1 1 auto;
			margin-bottom: 0;
		}
	}

	&__header {
		display: flex;
		font-size: 0.6rem;
	}

	&__label {
		display: flex;
		align-items: center;

		// This emulates the font-size of small kt-field labels
		font-size: 0.9em;
		color: var(--text-02);

		span {
			font-weight: 500;
		}
	}
}
</style>
